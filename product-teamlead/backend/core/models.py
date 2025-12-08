from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=100)
    status = models.CharField(max_length=50, default="Active")

    def __str__(self):
        return self.user.username


class Project(models.Model):
    name = models.CharField(max_length=150)
    team_lead = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(Employee, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    description = models.TextField()
    deadline = models.DateField()
    status = models.CharField(max_length=50, default="Pending")

    def __str__(self):
        return self.title


class Timesheet(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    hours = models.IntegerField()
    date = models.DateField()
    approved = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.employee} - {self.task}"
