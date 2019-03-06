from django.shortcuts import render
from .models import Usuario
import socket


# Create your views here.


def home(request):
    return render(request, 'contas/home.html')


def login(request):
    return render(request, 'contas/login.html')


def rankin(request):
    usuario = Usuario.objects.all().order_by('-pontuacao')
    return render(request, 'contas/registro.html', {"usuario": usuario})


def novo_usuario(request):
    nome = request.GET.get("nome")
    pont = request.GET.get("pontuacao")
    id_usuario = request.GET.get("id_usuario")
    try:
        usuario = Usuario.objects.filter(id_user=id_usuario)
        if len(usuario) == 0:
            Usuario.objects.create(nome=nome, pontuacao=pont, id_user=id_usuario)
        elif (len(usuario) == 1) and pont > usuario.pontuacao:
            if pont > usuario.pontuacao:
                Usuario.objects.filter(id_user=id_usuario).update(pontuacao=pont)
        else:
            nome = "{}({})".format(nome, len(usuario) + 1)
            Usuario.objects.create(nome=nome, pontuacao=pont, id_user=id_usuario)
    except:
        pass
    finally:
        return render(request, "home.html", {"nome": nome, "pont": pont, "id": id_usuario})
