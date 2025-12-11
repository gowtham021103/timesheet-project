from rest_framework import viewsets
from .models import Employee, Project, Task, Timesheet
<<<<<<< HEAD
from .serializers import (
    EmployeeSerializer,
    ProjectSerializer,
    TaskSerializer,
    TimesheetSerializer,
)

=======
from .serializers import EmployeeSerializer, ProjectSerializer, TaskSerializer, TimesheetSerializer
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

<<<<<<< HEAD

=======
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

<<<<<<< HEAD

=======
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

<<<<<<< HEAD

=======
>>>>>>> 9415b571d574ec9c719e5cec28a46f476714478f
class TimesheetViewSet(viewsets.ModelViewSet):
    queryset = Timesheet.objects.all()
    serializer_class = TimesheetSerializer
