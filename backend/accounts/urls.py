from django.urls import path
from .views import RegisterView, LoginView, ProfileView, CreateEmployeeView, create_client_admin, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("create-employee/", CreateEmployeeView.as_view()),
    path("create-client-admin/", create_client_admin),

]

