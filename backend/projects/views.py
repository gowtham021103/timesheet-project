from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
import traceback
import logging

from django.contrib.auth import get_user_model
from .models import Project
from .serializers import ProjectSerializer, AssignManagerSerializer

logger = logging.getLogger(__name__)

class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    # Allow unauthenticated access in development; change to IsAuthenticated in production
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except Exception as exc:
            logger.exception("Error in ProjectListCreateView.list")
            tb = traceback.format_exc()
            return Response({"detail": "Internal Server Error", "error": str(exc), "trace": tb}, status=500)

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except Exception as exc:
            logger.exception("Error in ProjectListCreateView.create")
            tb = traceback.format_exc()
            return Response({"detail": "Internal Server Error", "error": str(exc), "trace": tb}, status=500)

    def perform_create(self, serializer):
        # perform_create may expect an authenticated user; assign a fallback dev user when missing
        try:
            User = get_user_model()
            user = getattr(self.request, "user", None)
            if user and getattr(user, "is_authenticated", False):
                serializer.save(created_by=user)
                return

            # Try to use an existing superuser or first user as fallback
            dev_user = User.objects.filter(is_superuser=True).first() or User.objects.first()
            if not dev_user:
                # Create a simple dev user for local development
                dev_user = User.objects.create_user(username="dev", email="dev@example.com", password="devpass")

            serializer.save(created_by=dev_user)
        except Exception:
            logger.exception("Error in perform_create")
            raise


class ProjectAssignView(generics.GenericAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            user_id = request.data.get('user_id')
            notes = request.data.get('notes', '')
            
            if not user_id:
                return Response({"detail": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            User = get_user_model()
            assignee = User.objects.get(id=user_id)
            
            project.assigned_to = assignee
            project.assignment_notes = notes
            project.save()
            
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        except Exception as exc:
            logger.exception("Error in ProjectAssignView.post")
            tb = traceback.format_exc()
            return Response({"detail": "Internal Server Error", "error": str(exc), "trace": tb}, status=500)
