# Generated by Django 2.1.2 on 2019-03-06 00:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contas', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usuario',
            old_name='usuario',
            new_name='nome',
        ),
    ]