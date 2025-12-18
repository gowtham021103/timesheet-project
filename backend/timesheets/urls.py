from django.urls import path
from .views import EmployeeTimesheetView, AllTimesheetsView, TimesheetListCreateView

urlpatterns = [
    path("my/", EmployeeTimesheetView.as_view()),
    path("all/", AllTimesheetsView.as_view()),
    path("timesheets/", TimesheetListCreateView.as_view(), name="timesheets"),
]
