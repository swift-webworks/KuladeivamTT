from django.db import models


class Vehicle(models.Model):
    """Represents a vehicle offered by Kuladeivam Tours and Travels."""

    vehicle_name = models.CharField(max_length=100)
    vehicle_image = models.ImageField(upload_to='vehicles/')
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price in INR")
    capacity = models.PositiveIntegerField(help_text="Number of passengers")
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.vehicle_name
