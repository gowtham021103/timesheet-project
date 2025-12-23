import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

def create_sample_employees():
    sample_data = [
        {"username": "alice", "email": "alice@example.com", "role": "employee", "is_active": True},
        {"username": "bob", "email": "bob@example.com", "role": "employee", "is_active": False},
        {"username": "carol", "email": "carol@example.com", "role": "team_lead", "is_active": True},
        {"username": "dave", "email": "dave@example.com", "role": "manager", "is_active": True},
    ]
    for data in sample_data:
        user, created = User.objects.get_or_create(username=data["username"])
        user.email = data["email"]
        user.role = data["role"]
        user.is_active = data["is_active"]
        user.set_password('password123')
        user.save()
        print(f"Created/updated {user.username} ({user.role}) active={user.is_active}")

if __name__ == '__main__':
    create_sample_employees()
