# Generated by Django 4.2.5 on 2023-12-16 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0062_event_department'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.CharField(max_length=100)),
                ('receiver', models.CharField(max_length=100)),
                ('msg', models.TextField(blank=True)),
                ('time', models.CharField(max_length=100)),
                ('file', models.FileField(blank=True, upload_to='uploads')),
            ],
        ),
        migrations.CreateModel(
            name='MyInteraction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aluid', models.IntegerField()),
                ('aluname', models.CharField(max_length=100)),
                ('aluimage', models.CharField(max_length=100)),
                ('myid', models.IntegerField()),
                ('myname', models.CharField(max_length=100)),
                ('myimage', models.CharField(max_length=100)),
                ('mytype', models.CharField(max_length=100)),
                ('company', models.CharField(blank=True, max_length=100)),
                ('position', models.CharField(blank=True, max_length=100)),
            ],
        ),
    ]