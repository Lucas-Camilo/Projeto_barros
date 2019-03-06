from django.shortcuts import render
from .models import Usuario


# Create your views here.


def home(request):
    return render(request, 'contas/home.html')


def login(request):
    return render(request, 'contas/login.html')


def registrar(request):
    return render(request, 'contas/registro.html')


def novo_usuario(request):
    nome = request.Get.get("nome")
    pont = request.Get.get("pontuacao")
    try:
        usuario = Usuario.objects.filter(nome=nome)
        if len(usuario == 1):
            Usuario.objects.create(nome=nome, pontuacao=pont)
        else:
            nome = "{}({})".format(nome, len(usuario) + 1)
            Usuario.objects.create(nome=nome, pontuacao=pont)

    except:
        pass
    finally:
        return render(request, "home.html")
