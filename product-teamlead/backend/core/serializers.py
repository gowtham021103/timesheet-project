from rest_framework import serializers
from .models import Employee, Project, Task, Timesheet


class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Employee
        fields = ["id", "name", "role", "status"]


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "name", "team_lead"]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "id",
            "project",
            "assigned_to",
            "title",
            "description",
            "deadline",
            "status",
        ]

    # Ensure frontend sends integers, not arrays
    def validate_project(self, value):
        if isinstance(value, list):
            raise serializers.ValidationError("Project must be a single ID, not a list.")
        return value

    def validate_assigned_to(self, value):
        if isinstance(value, list):
            raise serializers.ValidationError("Assigned_to must be a single ID, not a list.")
        return value


class TimesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timesheet
        fields = "__all__"
