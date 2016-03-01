# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ApplicationURL',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(unique=True, max_length=100)),
                ('url', models.URLField()),
            ],
            options={
                'verbose_name': 'JIRA application URL',
                'verbose_name_plural': 'JIRA applications URL',
            },
        ),
    ]
