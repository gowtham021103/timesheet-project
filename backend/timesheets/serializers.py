from rest_framework import serializers
from .models import Timesheet

class TimesheetSerializer(serializers.ModelSerializer):
    employee_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Timesheet
        fields = "__all__"
        read_only_fields = ["employee", "created_at", "employee_name"]

    def get_employee_name(self, obj):
        return str(obj.employee)