from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated




# Import client-related models (if any)
from .models import ClientProfile  # Example client model
from .serializers import ClientProfileSerializer

# Import the real Project model and serializer from the projects app
from projects.models import Project
from projects.serializers import ProjectSerializer

# Example: client-specific viewset (optional)
class ClientProfileViewSet(viewsets.ModelViewSet):
    queryset = ClientProfile.objects.all()
    serializer_class = ClientProfileSerializer
    permission_classes = [IsAuthenticated]

# Project viewset using the correct Project model
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
