# Generated by Django 2.0.13 on 2019-03-10 11:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testM', '0003_mchat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mchat',
            name='option',
            field=models.BooleanField(),
        ),
    ]
