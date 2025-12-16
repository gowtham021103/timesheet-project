import csv
from datetime import date
from calendar import monthrange
from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import TimesheetEntry

# Landing page
def index(request):
    return render(request, 'timesheet/index.html')  

# Dashboard page
def dashboard(request):
    return render(request, 'timesheet/dashboard.html')

# Monthly timesheet view
def timesheet_view(request):
    today = date.today()
    year = int(request.GET.get("year", today.year))
    month = int(request.GET.get("month", today.month))

    # Generate list of dates for the month
    days_in_month = monthrange(year, month)[1]
    dates = [date(year, month, d) for d in range(1, days_in_month + 1)]

    if request.method == "POST":
        # Delete existing entries for this month before saving new ones
        TimesheetEntry.objects.filter(date__year=year, date__month=month).delete()

        # Save new entries from POST data
        for d in dates:
            hours = request.POST.get(f"hours_{d}", 0)
            task = request.POST.get(f"task_{d}", "")
            status = request.POST.get(f"status_{d}", "Work")

            TimesheetEntry.objects.create(
                date=d,
                hours=float(hours or 0),
                task=task,
                status=status
            )
        # Redirect to same page to show updated data
        return redirect(request.path + f"?year={year}&month={month}")

    # Fetch existing entries for the month
    existing_entries = {
        e.date: e for e in TimesheetEntry.objects.filter(date__year=year, date__month=month)
    }

    # Build entries_list for template
    entries_list = []
    for d in dates:
        entry = existing_entries.get(d)
        if not entry:
            # Create a dummy object for template if entry does not exist
            class EmptyEntry:
                def __init__(self):
                    self.hours = 0
                    self.task = ''
                    self.status = 'Work'
            entry = EmptyEntry()
        entries_list.append({'date': d, 'entry': entry})

    context = {
        "entries_list": entries_list,
        "month": month,
        "year": year,
    }
    return render(request, "timesheet/timesheet.html", context)

# Export all timesheet entries as CSV
def export_csv(request):
    response = HttpResponse(content_type="text/csv")
    response["Content-Disposition"] = "attachment; filename=timesheet.csv"

    writer = csv.writer(response)
    writer.writerow(["Date", "Hours", "Task", "Status"])

    for entry in TimesheetEntry.objects.all().order_by("date"):
        writer.writerow([entry.date, entry.hours, entry.task, entry.status])

    return response
