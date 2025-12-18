from django.contrib import admin
from .models import Timesheet

@admin.register(Timesheet)
class TimesheetAdmin(admin.ModelAdmin):
    list_display = ("employee", "date", "hours", "created_at")
    list_filter = ("date",)
