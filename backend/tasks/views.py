from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
import logging

from .models import Task
from .serializers import TaskSerializer

logger = logging.getLogger(__name__)


class TaskListCreateView(generics.ListCreateAPIView):
	queryset = Task.objects.all().order_by("-created_at")
	serializer_class = TaskSerializer
	permission_classes = [IsAuthenticated]

	def create(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		if not serializer.is_valid():
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

		try:
			self.perform_create(serializer)
		except Exception as exc:
			# log full exception for server-side debugging and return message
			logger.exception("Error creating Task")
			return Response({"detail": str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		headers = self.get_success_headers(serializer.data)
		return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

	def perform_create(self, serializer):
		serializer.save()


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Task.objects.all()
	serializer_class = TaskSerializer
	permission_classes = [IsAuthenticated]
