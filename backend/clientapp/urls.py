from rest_framework.routers import DefaultRouter
from .views import ClientProfileViewSet, ProjectViewSet

router = DefaultRouter()
router.register(r'clients', ClientProfileViewSet, basename='client')
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = router.urls
