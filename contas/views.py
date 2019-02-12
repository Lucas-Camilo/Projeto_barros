from django.shortcuts import render

# Create your views here.


def home(request):
    return render(request, 'contas/home.html')
def registrar(request):
    return render(request, ' contas/registro.html')
def login(request):
    return render(request, 'contas/login.html')
