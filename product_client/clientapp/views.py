from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Project, Assignment, ProjectReport, Profile
from .serializers import ProjectSerializer, AssignmentSerializer, ProjectReportSerializer, UserSerializer
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ManagerListAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    def get_queryset(self):
        return User.objects.filter(profile__is_manager=True)

from rest_framework.permissions import AllowAny

class ProjectListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
 # allow read for everyone; creation requires auth (adjust as needed)

    def get_queryset(self):
        qs = Project.objects.all().order_by('-created_at')
        status_filter = self.request.query_params.get('status')
        if status_filter:
            qs = qs.filter(status=status_filter)
        return qs

    def perform_create(self, serializer):
        # If you have authentication, set created_by from request.user
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(created_by=user)

class AssignmentCreateAPIView(generics.CreateAPIView):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class AssignmentListAPIView(generics.ListAPIView):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.select_related('project','manager').all().order_by('-created_at')


class ProjectReportListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ProjectReportSerializer
    def get_queryset(self):
        qs = ProjectReport.objects.select_related('project').all().order_by('-created_at')
        project_id = self.request.query_params.get('project_id')
        if project_id:
            qs = qs.filter(project_id=project_id)
        return qs
