from rest_framework import serializers
from .models import Timesheet

class ClientTimesheetSerializer(serializers.ModelSerializer):
    employee = serializers.ReadOnlyField(source='employee.username')
    project = serializers.ReadOnlyField(source='project.name')

    class Meta:
        model = Timesheet
        fields = '__all__'
