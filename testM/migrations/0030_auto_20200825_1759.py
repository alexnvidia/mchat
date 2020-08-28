# Generated by Django 3.0.9 on 2020-08-25 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testM', '0029_auto_20200801_1844'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='positive_tr',
            field=models.BooleanField(blank=True, choices=[(None, ''), (True, 'Si'), (False, 'No')], default=False, max_length=3, null=True),
        ),
        migrations.AlterField(
            model_name='patient',
            name='positive',
            field=models.BooleanField(blank=True, choices=[(None, ''), (True, 'Si'), (False, 'No')], default=False, max_length=3, null=True),
        ),
    ]
