# Generated by Django 4.1.5 on 2023-07-26 02:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("novel", "0004_novelsinfo_sales"),
    ]

    operations = [
        migrations.AddField(
            model_name="novelstype",
            name="logo",
            field=models.CharField(default="", max_length=10, verbose_name="类型标记"),
        ),
    ]