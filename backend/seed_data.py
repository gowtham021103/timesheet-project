import os
import django
import random
from datetime import date, timedelta
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from projects.models import Project
from tasks.models import Task
from timesheets.models import Timesheet
from payroll.models import Payroll

User = get_user_model()

def create_users():
    print("Creating users...")
    roles = ['admin', 'manager', 'team_lead', 'employee', 'hr', 'client_admin']
    users = {}
    
    for role in roles:
        username = f"{role}_user"
        email = f"{role}@example.com"
        user, created = User.objects.get_or_create(username=username)
        user.set_password("password123")
        user.role = role
        user.email = email
        user.save()
        users[role] = user
        print(f" - {role}: {username} / password123")

    # Create extra employees
    extra_employees = []
    for i in range(1, 6):
        username = f"employee_{i}"
        user, _ = User.objects.get_or_create(username=username)
        user.set_password("password123")
        user.role = "employee"
        user.save()
        extra_employees.append(user)
        print(f" - employee: {username}")
    
    users['extra_employees'] = extra_employees
    return users

def create_projects(users):
    print("Creating projects...")
    team_lead = users['team_lead']
    projects = []
    
    titles = ["Website Redesign", "Mobile App Development", "Cloud Migration", "Internal Audit System"]
    statuses = ["In Progress", "Pending", "Completed"]
    
    for i, title in enumerate(titles):
        project, _ = Project.objects.get_or_create(
            name=title,
            defaults={
                "team_lead": team_lead,
                "description": f"This is a sample project for {title}.",
                "deadline": date.today() + timedelta(days=30 + i*10),
                "status": random.choice(statuses)
            }
        )
        projects.append(project)
        print(f" - Project: {project.name}")
    return projects

def create_tasks(users, projects):
    print("Creating tasks...")
    tasks = []
    employees = users['extra_employees'] + [users['employee']]
    
    for project in projects:
        for i in range(3): # 3 tasks per project
            task_title = f"Task {i+1} for {project.name}"
            assigned = random.choice(employees)
            task, _ = Task.objects.get_or_create(
                title=task_title,
                project=project,
                defaults={
                    "assigned_to": assigned,
                    "description": "Please complete this task by EOD.",
                    "deadline": date.today() + timedelta(days=random.randint(1, 10)),
                    "status": random.choice(["Pending", "In Progress", "Completed"])
                }
            )
            tasks.append(task)
    print(f" - Created {len(tasks)} tasks.")

def create_timesheets(users):
    print("Creating timesheets...")
    employees = users['extra_employees'] + [users['employee']]
    
    for emp in employees:
        for i in range(5):
            Timesheet.objects.create(
                employee=emp,
                date=date.today() - timedelta(days=i),
                hours=random.randint(4, 9),
                task=f"Worked on development tasks - Day {i}",
                approved=random.choice([True, False])
            )
    print(" - Created timesheets.")

def create_payroll(users):
    print("Creating payroll...")
    employees = users['extra_employees'] + [users['employee']]
    
    for emp in employees:
        Payroll.objects.create(
            employee=emp,
            month=date.today().replace(day=1),
            basic_salary=Decimal(5000),
            bonus=Decimal(random.randint(0, 500)),
            deductions=Decimal(random.randint(0, 200)),
            status=random.choice(["Paid", "Pending"])
        )
    print(" - Created payroll entries.")

if __name__ == "__main__":
    users = create_users()
    projects = create_projects(users)
    create_tasks(users, projects)
    create_timesheets(users)
    create_payroll(users)
    print("Done! Database successfully seeded.")
