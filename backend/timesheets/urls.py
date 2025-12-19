from django.urls import path
from .views import ClientReportView

urlpatterns = [
    path('client/reports/', ClientReportView.as_view()),
]
