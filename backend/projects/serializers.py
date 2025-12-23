from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='name', read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "deadline",
            "status",
            "team_lead",
        ]
