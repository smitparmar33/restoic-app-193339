# Generated by Django 2.2.19 on 2021-04-05 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0052_auto_20210405_1125'),
    ]

    operations = [
        migrations.AddField(
            model_name='code',
            name='users_limit',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]