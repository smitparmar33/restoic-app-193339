# Generated by Django 2.2.17 on 2021-01-02 14:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0036_auto_20210102_1526'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historyrecord',
            name='updated',
        ),
    ]