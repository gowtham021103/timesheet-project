from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Add your client-specific models here
# Example:
class ClientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="client_profile")
    company_name = models.CharField(max_length=255, blank=True)
    contact_number = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.user.username
