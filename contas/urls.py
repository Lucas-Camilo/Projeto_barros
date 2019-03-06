from django.urls import path

from . import views

urlpatterns = [
    path('', views.home),
    path('registrar/', views.registrar),
    path('login/', views.login),
    path('novo_usuario', views.novo_usuario)
]
