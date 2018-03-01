# Generated by Django 2.0.2 on 2018-03-01 18:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=255)),
                ('updated_datetime', models.DateTimeField()),
                ('comment_text', models.TextField(max_length=65535)),
            ],
        ),
        migrations.CreateModel(
            name='Factor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('org_name', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(max_length=65535)),
                ('weight', models.FloatField()),
                ('intercept', models.FloatField()),
                ('balanced', models.BooleanField()),
                ('enabled', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='MlModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(max_length=65535)),
                ('accuracy', models.FloatField()),
                ('parent_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='restapi.MlModel')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('user_type', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='factor',
            name='model_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.MlModel'),
        ),
        migrations.AddField(
            model_name='comment',
            name='factor_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restapi.Factor'),
        ),
    ]