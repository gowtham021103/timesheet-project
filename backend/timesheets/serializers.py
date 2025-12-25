from rest_framework import serializers
from .models import Timesheet

class TimesheetSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField(read_only=True)

    project_id = serializers.IntegerField(source='task.project.id', read_only=True)
    task_title = serializers.CharField(source='task.title', read_only=True)
    project_title = serializers.CharField(source='task.project.name', read_only=True)

    class Meta:
        model = Timesheet
        fields = "__all__"
        read_only_fields = ["employee", "created_at", "employee_name", "project_id", "task_title", "project_title"]

    def get_employee_name(self, obj):
        return str(obj.employee)