from rest_framework import serializers
from .models import Employee, Project, Task, Timesheet

<<<<<<< HEAD

class EmployeeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Employee
        fields = ["id", "name", "role", "status"]

=======
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
<<<<<<< HEAD
        fields = ["id", "name", "team_lead"]

=======
        fields = '__all__'
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
<<<<<<< HEAD
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

=======
        fields = '__all__'
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f

class TimesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timesheet
<<<<<<< HEAD
        fields = "__all__"
=======
        fields = '__all__'
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f
