from django.db import models
from django.conf import settings

class Project(models.Model):
    name = models.CharField(max_length=150)
    team_lead = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="lead_projects"
    )

    def __str__(self):
        return self.name

