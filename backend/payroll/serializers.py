from rest_framework import serializers
from .models import Payroll
from accounts.serializers import UserSerializer

class PayrollSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.username', read_only=True)

    class Meta:
        model = Payroll
        fields = '__all__'
        extra_kwargs = {
            'employee': {'read_only': False}
        }
