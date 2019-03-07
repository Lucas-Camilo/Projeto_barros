from django.shortcuts import render, HttpResponse
from .models import Usuario

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
    id_usuario = str(request.GET.get("id_usuario"))
    try:
        all_usuarios = Usuario.objects.all().filter(id_user=id_usuario)
        usuario = Usuario.objects.get(id_user=id_usuario)
        if len(all_usuarios) == 0:
            Usuario.objects.create(nome=nome, pontuacao=pont, id_user=id_usuario)
        elif len(all_usuarios) == 1 and int(pont) > usuario.pontuacao:
            Usuario.objects.filter(id_user=id_usuario).update(pontuacao=pont)
        else:
            nome = "{}({})".format(nome, len(all_usuarios) + 1)
            Usuario.objects.create(nome=nome, pontuacao=pont, id_user=id_usuario)
        return HttpResponse("Sucesso")
    except Exception as erro:
        return HttpResponse("ERRO No jogo"+erro)

