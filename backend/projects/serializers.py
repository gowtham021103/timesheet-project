from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='name', read_only=True)
    name = serializers.CharField(required=False)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "name",
            "description",
            "deadline",
            "status",
            "team_lead",
            "client",
        ]
