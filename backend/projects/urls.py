from django.urls import path
from .views import ProjectListCreateView, ClientCreateProjectView, ClientProjectListView, AssignManagerView

urlpatterns = [
    path("", ProjectListCreateView.as_view(), name="project-list-create"),
    path('client/create/', ClientCreateProjectView.as_view()),
    path('client/list/', ClientProjectListView.as_view()),
    path('client/assign-manager/<int:pk>/', AssignManagerView.as_view()),
]
