from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Timesheet
from .serializers import TimesheetSerializer

class TimesheetListCreateView(ListCreateAPIView):
    serializer_class = TimesheetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Timesheet.objects.filter(employee=self.request.user)

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)