from django.shortcuts import render
from .models import Vehicle


def index_page(request):
    """Home page: hero, featured services preview, about, contact."""
    featured_vehicles = Vehicle.objects.all()[:3]
    all_vehicles = Vehicle.objects.all()
    context = {
        'featured_vehicles': featured_vehicles,
        'all_vehicles': all_vehicles,
    }
    return render(request, 'index.html', context)


def service(request):
    """Service page: all vehicles displayed dynamically."""
    vehicles = Vehicle.objects.all()
    context = {
        'vehicles': vehicles,
    }
    return render(request, 'services.html', context)
