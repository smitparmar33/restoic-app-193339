# Generated by Django 2.2.16 on 2020-10-03 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0012_auto_20200929_1708'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuickLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('subtitle', models.CharField(blank=True, max_length=250, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('thumbnail', models.ImageField(default='default.jpg', upload_to='quicklinks/thumbnail/')),
                ('link', models.CharField(blank=True, max_length=250, null=True)),
                ('in_app', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
