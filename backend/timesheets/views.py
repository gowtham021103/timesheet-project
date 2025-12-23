from rest_framework import viewsets, permissions
from .models import Timesheet
from .serializers import TimesheetSerializer

class IsOwnerOrHRTeamLead(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Owner can view/edit
        if obj.employee == request.user:
            return True
        # HR/TeamLead can view/edit
        if request.user.role in ['hr', 'team_lead', 'admin', 'manager']:
            return True
        return False

class TimesheetViewSet(viewsets.ModelViewSet):
    serializer_class = TimesheetSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrHRTeamLead]

    def get_queryset(self):
        user = self.request.user
        if user.role in ['hr', 'admin', 'manager', 'team_lead']:
            return Timesheet.objects.all()
        return Timesheet.objects.filter(employee=user)

    def perform_create(self, serializer):
        serializer.save(employee=self.request.user)

    def perform_update(self, serializer):
        user = self.request.user
        if user.role == 'employee' and 'approved' in serializer.validated_data:
            # Employee cannot change approval status
            serializer.validated_data.pop('approved')
        serializer.save()