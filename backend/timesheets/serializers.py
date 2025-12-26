from rest_framework import serializers
from .models import Timesheet

class TimesheetSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField(read_only=True)

    project_id = serializers.SerializerMethodField(read_only=True)
    task_title = serializers.CharField(source='task', read_only=True)
    project_title = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Timesheet
        fields = "__all__"
        read_only_fields = ["employee", "created_at", "employee_name", "project_id", "task_title", "project_title"]

    def get_employee_name(self, obj):
        return str(obj.employee)

    def get_project_id(self, obj):
        # Current Timesheet model does not have a project link
        return None

    def get_project_title(self, obj):
        # Current Timesheet model does not have a project link
        return "N/A"