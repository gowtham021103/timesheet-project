from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    ProfileView,
    CreateEmployeeView,
    create_client_admin,
    LogoutView,
    EmployeeListView,
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
    path("employees/create/", CreateEmployeeView.as_view()),  # POST

    # Client admin
    path("create-client-admin/", create_client_admin),
]
