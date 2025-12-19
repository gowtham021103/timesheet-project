from django.db import models
from django.conf import settings

class Timesheet(models.Model):
    employee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='timesheets'
    )
    project = models.ForeignKey(
        'projects.Project',
        on_delete=models.CASCADE,
        related_name='timesheets'
    )
    hours = models.FloatField()
    date = models.DateField()
    status = models.CharField(max_length=20, default='PENDING')

    def __str__(self):
        return f"{self.employee} - {self.project}"
