from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class WeatherRecord(models.Model):

    location = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    average_temperature = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True,blank=True)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name='weather_records_created_by',blank=True,null=True)
    updated_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name='weather_records_updated_by',blank=True,null=True)

    class Meta:
        db_table = 'weather_records'

    def __str__(self):
        return f"{self.location} ({self.start_date} to {self.end_date}) temperature is {self.average_temperature} in foreignheit"