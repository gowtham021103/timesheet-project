from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    ProfileView,
    CreateEmployeeView,
    create_client_admin,
    LogoutView,
    EmployeeListView,

    ManagerListView,
    EmployeeDetailView,
    ClientListView,
    ClientDetailView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("profile/", ProfileView.as_view()),

    # Employees
    path("employees/", EmployeeListView.as_view()),       # GET
    path("employees/<int:pk>/", EmployeeDetailView.as_view()), # GET, PUT, DELETE
    path("managers/", ManagerListView.as_view()),         # GET
    path("employees/create/", CreateEmployeeView.as_view()),  # POST

    # Client admin
    path("create-client-admin/", create_client_admin),
    path("admin/clients/", ClientListView.as_view()),
    path("admin/clients/<int:pk>/", ClientDetailView.as_view()),
]
