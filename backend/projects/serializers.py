from rest_framework import serializers
from .models import Project
from django.contrib.auth import get_user_model

User = get_user_model()


class ProjectSerializer(serializers.ModelSerializer):
    # Expose assigned user's username as assignedTo for frontend compatibility
    assignedTo = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['id', 'created_at']

    def get_assignedTo(self, obj):
        if obj.assigned_to:
            return obj.assigned_to.username
        return None


class AssignManagerSerializer(serializers.Serializer):
    manager_id = serializers.IntegerField()

    def validate_manager_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise serializers.ValidationError("Invalid manager")
        return value
