from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsClient
from .models import Timesheet
from .serializers import ClientTimesheetSerializer

class ClientReportView(ListAPIView):
    serializer_class = ClientTimesheetSerializer
    permission_classes = [IsAuthenticated, IsClient]

    def get_queryset(self):
        return Timesheet.objects.filter(
            project__client=self.request.user,
            status='APPROVED'
        )

