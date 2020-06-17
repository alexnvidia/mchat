# Generated by Django 3.0.5 on 2020-04-24 15:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('testM', '0005_auto_20200424_1738'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mchat',
            name='author',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='mchat',
            name='name',
            field=models.CharField(default='', max_length=50, primary_key=True, serialize=False),
        ),
    ]
