from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.db import IntegrityError

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_client_admin(request):
    data = request.data
    user = User.objects.create_user(    
        username=data["username"],
        password=data["password"],
        role="client_admin",
        is_staff=True,
    )
    return Response({"message": "Client Admin created"})

class CreateEmployeeView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        data = request.data

        user = User.objects.create_user(
            username=data["username"],
            employee_id=data["employee_id"],
            password=data["password"],
            role=data.get("role", "employee"),
        )

        return Response({"message": "Employee created"})
    
class CreateClientAdminView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "super_admin":
            return Response({"detail": "Forbidden"}, status=403)

        serializer = ClientAdminSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"message": "Client admin created"})


class EmployeeListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # only allow non-employee users to list employees
        if getattr(request.user, "role", "employee") == "employee":
            return Response({"detail": "Forbidden"}, status=403)

        # include both regular employees and team leads so manager can select/change leads
        employees = User.objects.filter(role__in=["employee", "team_lead"]).order_by("first_name")
        serializer = UserSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request):
        if getattr(request.user, "role", "employee") == "employee":
            return Response({"detail": "Forbidden"}, status=403)

        data = request.data
        # map incoming frontend `name` -> first_name, and require email
        name = data.get("name") or data.get("first_name")
        email = data.get("email")
        if not name or not email:
            return Response({"detail": "name and email are required"}, status=400)

        username = email
        # create a simple default password; frontend may implement password reset flow
        password = data.get("password", "password123")
        # guard against duplicate usernames (email)
        if User.objects.filter(username=username).exists():
            return Response({"detail": "A user with that email/username already exists."}, status=400)

        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                first_name=name,
                password=password,
                role=data.get("role", "employee"),
            )
        except IntegrityError:
            return Response({"detail": "Could not create user — username conflict."}, status=400)

        # optional employee_id
        if data.get("employee_id"):
            user.employee_id = data.get("employee_id")
            user.save()

        return Response({"message": "Employee created"}, status=201)


class EmployeeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        if getattr(request.user, "role", "employee") == "employee":
            return Response({"detail": "Forbidden"}, status=403)
        user = get_object_or_404(User, pk=pk)
        # only allow viewing employee-like users
        if user.role not in ("employee", "team_lead"):
            return Response({"detail": "Not found"}, status=404)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        if getattr(request.user, "role", "employee") == "employee":
            return Response({"detail": "Forbidden"}, status=403)
        user = get_object_or_404(User, pk=pk)
        # only allow updating employee-like users
        if user.role not in ("employee", "team_lead"):
            return Response({"detail": "Not found"}, status=404)

        data = request.data
        user.first_name = data.get("name", user.first_name)
        user.email = data.get("email", user.email)
        # allow updating role (e.g., set team_lead)
        new_role = data.get("role")
        if new_role:
            valid_roles = [r[0] for r in User.ROLE_CHOICES]
            if new_role in valid_roles:
                user.role = new_role
        if data.get("employee_id") is not None:
            user.employee_id = data.get("employee_id")
        user.save()
        return Response({"message": "Employee updated"})

    def delete(self, request, pk):
        if getattr(request.user, "role", "employee") == "employee":
            return Response({"detail": "Forbidden"}, status=403)
        user = get_object_or_404(User, pk=pk)
        if user.role not in ("employee", "team_lead"):
            return Response({"detail": "Not found"}, status=404)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
