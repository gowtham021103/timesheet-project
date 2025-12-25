from django.db import models
from django.conf import settings

class Project(models.Model):
    name = models.CharField(max_length=150)
    team_lead = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="lead_projects"
    )
    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="client_projects",
        limit_choices_to={'role': 'client_admin'}
    )
    description = models.TextField(blank=True, null=True)
    deadline = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=50, default="Pending")

    def __str__(self):
        return self.name

