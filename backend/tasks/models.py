from django.db import models
from django.conf import settings


class Task(models.Model):
	STATUS_CHOICES = (
		("pending", "Pending"),
		("in_progress", "In Progress"),
		("completed", "Completed"),
		("approved", "Approved"),
		("rejected", "Rejected"),
	)

	title = models.CharField(max_length=255)
	description = models.TextField(blank=True)
	assigned_to = models.ForeignKey(
		settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="tasks"
	)
	due_date = models.DateField()
	status = models.CharField(max_length=32, choices=STATUS_CHOICES, default="pending")
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f"{self.title} -> {self.assigned_to.username}"
