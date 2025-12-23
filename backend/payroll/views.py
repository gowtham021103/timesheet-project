from rest_framework import viewsets, permissions
from .models import Payroll
from .serializers import PayrollSerializer

class IsHR(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'hr'

class PayrollViewSet(viewsets.ModelViewSet):
    queryset = Payroll.objects.all().order_by('-created_at')
    serializer_class = PayrollSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsHR()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        # Employees see only their own payroll
        user = self.request.user
        if user.role == 'employee':
            return Payroll.objects.filter(employee=user)
        # HR/Admin see all
        return super().get_queryset()
