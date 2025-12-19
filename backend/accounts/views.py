from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken

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


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = RefreshToken(request.data["refresh"])
            token.blacklist()
            return Response({"detail": "Logged out"})
        except Exception:
            return Response({"detail": "Invalid token"}, status=400)