from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from timesheets.models import Timesheet


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "role"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "role"]

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data["email"],
            role=validated_data["role"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class LoginSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["role"] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["role"] = self.user.role
        data["username"] = self.user.username
        return data


class EmployeeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "role"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class EmployeeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "role", "is_active"]

class EmployeeSerializer(serializers.ModelSerializer):
    role = serializers.CharField(default="Employee")
    status = serializers.CharField(default="Active")

    class Meta:
        model = User
        fields = ["id", "username", "email", "role", "status"]


class TimesheetSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(
        source="employee.username", read_only=True
    )

    class Meta:
        model = Timesheet
        fields = [
            "id",
            "employee_name",
            "date",
            "hours",
            "task",
            "created_at",
        ]