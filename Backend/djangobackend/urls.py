from django.contrib import admin
from django.urls import path,include
from djangobackend import views

urlpatterns = [
    path('getAnyInformation',views.sendToBackend),
    path('auth',views.Order_Product)
]