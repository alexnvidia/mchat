# Generated by Django 3.0.5 on 2020-05-18 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testM', '0018_auto_20200517_1947'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='puntuacion_mchat',
            field=models.IntegerField(default=0),
        ),
    ]