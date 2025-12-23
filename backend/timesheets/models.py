from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Timesheet(models.Model):
    employee = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="timesheets"
    )
    date = models.DateField()
    hours = models.DecimalField(
        max_digits=4,
        decimal_places=1
    )
    task = models.TextField()
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date", "-created_at"]

    def __str__(self):
        return f"{self.employee} - {self.date}"
