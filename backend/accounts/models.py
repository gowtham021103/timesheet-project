from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("client_admin", "Client Admin"),
        ("team_lead", "Team Lead"),
        ("manager", "Manager"),
        ("employee", "Employee"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="employee",
    )
    employee_id = models.CharField(max_length=50, blank=True, null=True, unique=True)

    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = "admin"
        super().save(*args, **kwargs)

