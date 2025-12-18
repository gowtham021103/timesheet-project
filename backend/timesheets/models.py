from django.db import models
from django.conf import settings

class Timesheet(models.Model):
    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="timesheets"
    )
    date = models.DateField()
    hours = models.DecimalField(max_digits=4, decimal_places=1)
    task = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.username} - {self.date}"
