from rest_framework.viewsets import ModelViewSet
from .models import Project
from .serializers import ProjectSerializer

from rest_framework import permissions

class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'client_admin':
            return Project.objects.filter(client=user)
        return Project.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'client_admin':
            serializer.save(client=user)
        else:
            serializer.save()
