from django.db.models.signals import post_save
from django.dispatch import receiver
from tasks.models import Task
from timesheets.models import Timesheet
from accounts.models import User
from .models import Notification

@receiver(post_save, sender=Task)
def notify_employee_on_task_assignment(sender, instance, created, **kwargs):
    if created and instance.assigned_to:
        Notification.objects.create(
            recipient=instance.assigned_to,
            message=f"New task assigned: {instance.title}",
            notification_type="info",
            related_task=instance
        )

@receiver(post_save, sender=Timesheet)
def notify_manager_on_timesheet_submission(sender, instance, created, **kwargs):
    if created:
        # Notify all managers and team leads
        managers = User.objects.filter(role__in=['manager', 'team_lead'])
        for manager in managers:
            Notification.objects.create(
                recipient=manager,
                message=f"New timesheet submitted by {instance.employee.username}",
                notification_type="warning" # or info
            )
