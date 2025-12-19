from rest_framework import serializers
from .models import Timesheet

class TimesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timesheet
        fields = "__all__"
        read_only_fields = ["employee", "created_at"]