from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Project, Assignment, ProjectReport, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']
    # We'll filter managers in the view

class ProjectSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    class Meta:
        model = Project
        fields = ['id','title','description','created_by','status','created_at','due_date']

class AssignmentSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    project_id = serializers.IntegerField(write_only=True)
    manager_id = serializers.IntegerField(write_only=True)

    manager = UserSerializer(read_only=True)

    class Meta:
        model = Assignment
        fields = ['id','project','project_id','manager','manager_id','assigned_at','notes']

    def create(self, validated_data):
        project_id = validated_data.pop('project_id')
        manager_id = validated_data.pop('manager_id')
        project = Project.objects.get(id=project_id)
        manager = User.objects.get(id=manager_id)
        assignment = Assignment.objects.create(project=project, manager=manager, **validated_data)
        # update project status
        project.status = 'assigned'
        project.save()
        return assignment

class ProjectReportSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    project_id = serializers.IntegerField(write_only=True)
    class Meta:
        model = ProjectReport
        fields = ['id','project','project_id','title','content','created_at']

    def create(self, validated_data):
        project_id = validated_data.pop('project_id')
        project = Project.objects.get(id=project_id)
        return ProjectReport.objects.create(project=project, **validated_data)
