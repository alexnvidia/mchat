# Generated by Django 3.0.5 on 2020-04-24 16:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('testM', '0009_auto_20200424_1829'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='item',
            name='mchat',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testM.Mchat'),
        ),
    ]
