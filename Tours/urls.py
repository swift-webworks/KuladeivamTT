from django.urls import path
from Tours import views

urlpatterns = [
    path('', views.index_page, name='index'),
    path('service/', views.service, name='service'),
]
