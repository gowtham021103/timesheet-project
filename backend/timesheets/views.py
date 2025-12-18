from rest_framework import generics, permissions
from .models import Timesheet
from .serializers import TimesheetSerializer

class EmployeeTimesheetView(generics.ListCreateAPIView):
    serializer_class = TimesheetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Timesheet.objects.filter(employee=self.request.user)

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)


class AllTimesheetsView(generics.ListAPIView):
    serializer_class = TimesheetSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return Timesheet.objects.all()

from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Timesheet
from .serializers import TimesheetSerializer

class TimesheetListCreateView(ListCreateAPIView):
    serializer_class = TimesheetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Employee sees only their timesheets
        return Timesheet.objects.filter(employee=self.request.user)

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)
