from django.urls import path
from .views import ManagerListAPIView, ProjectListCreateAPIView, AssignmentCreateAPIView, AssignmentListAPIView, ProjectReportListCreateAPIView

urlpatterns = [
    path('managers/', ManagerListAPIView.as_view(), name='managers'),
    path('projects/', ProjectListCreateAPIView.as_view(), name='projects'),
    path('assign/', AssignmentCreateAPIView.as_view(), name='assign'),
    path('assignments/', AssignmentListAPIView.as_view(), name='assignments'),
    path('reports/', ProjectReportListCreateAPIView.as_view(), name='reports'),
]
