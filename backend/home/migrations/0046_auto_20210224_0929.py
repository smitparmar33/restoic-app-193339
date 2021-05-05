# Generated by Django 2.2.18 on 2021-02-24 08:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0045_auto_20210219_2229'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='code',
        ),
        migrations.AddField(
            model_name='code',
            name='team',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='code_team', to='home.Team'),
        ),
        migrations.AlterField(
            model_name='code',
            name='percentage_off',
            field=models.CharField(default=0, max_length=4),
        ),
        migrations.AlterField(
            model_name='code',
            name='type',
            field=models.CharField(choices=[('CODE', 'CODE'), ('LICENCE', 'LICENCE'), ('TEAM', 'TEAM')], default='CODE', max_length=225),
        ),
    ]