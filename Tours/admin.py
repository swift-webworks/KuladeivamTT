from django.contrib import admin
from django.utils.html import format_html
from .models import Vehicle


@admin.register(Vehicle)
class VehicleAdmin(admin.ModelAdmin):
    list_display = ('vehicle_name', 'price', 'capacity', 'image_preview', 'created_at')
    list_filter = ('capacity', 'created_at')
    search_fields = ('vehicle_name', 'description')
    ordering = ('-created_at',)
    readonly_fields = ('image_preview_large',)
    fields = ('vehicle_name', 'vehicle_image', 'image_preview_large', 'price', 'capacity', 'description')

    def image_preview(self, obj):
        if obj.vehicle_image:
            return format_html('<img src="{}" style="height:45px;border-radius:4px;" />', obj.vehicle_image.url)
        return "-"
    image_preview.short_description = "Image"

    def image_preview_large(self, obj):
        if obj.vehicle_image:
            return format_html('<img src="{}" style="max-height:200px;border-radius:8px;" />', obj.vehicle_image.url)
        return "No image uploaded yet"
    image_preview_large.short_description = "Preview"
