from django.urls import path
from .views import (
    TimesheetListCreateView,
)

urlpatterns = [
    
    
    path("timesheets/", TimesheetListCreateView.as_view(), name="timesheets"),
]
