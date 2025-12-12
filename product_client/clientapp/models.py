from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    is_manager = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} (manager={self.is_manager})"

class Project(models.Model):
    STATUS_CHOICES = [
        ('draft','Draft'),
        ('assigned','Assigned'),
        ('in_progress','In Progress'),
        ('completed','Completed'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_projects')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title

class Assignment(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name='assignment')
    manager = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assignments')
    assigned_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.project.title} -> {self.manager.username if self.manager else 'None'}"

class ProjectReport(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='reports')
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # optional file: report_file = models.FileField(upload_to='reports/', null=True, blank=True)

    def __str__(self):
        return f"Report for {self.project.title} at {self.created_at}"
