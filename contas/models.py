from django.db import models

# Create your models here.
class Usuario(models.Model):
    nome = models.CharField(max_length=50)
    pontuacao = models.IntegerField()
    id_user = models.CharField(max_length=25)
    def __str__(self):
        return self.nome