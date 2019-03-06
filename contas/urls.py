from django.urls import path

from . import views

urlpatterns = [
    path('', views.home),
    path('rank/', views.registrar),
    path('login/', views.login),
    path('novo_usuario', views.novo_usuario)
]
