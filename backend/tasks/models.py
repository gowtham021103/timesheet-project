from django.db import models
from django.conf import settings
from projects.models import Project

class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="tasks"
    )
    title = models.CharField(max_length=250)
    description = models.TextField()
    deadline = models.DateField()
    status = models.CharField(max_length=50, default="Pending")

    def __str__(self):
        return self.title
