# Generated by Django 3.0.9 on 2020-08-25 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testM', '0030_auto_20200825_1759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='followup_list',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AlterField(
            model_name='patient',
            name='item_score',
            field=models.CharField(default='', max_length=21),
        ),
    ]
