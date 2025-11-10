
from django.contrib import admin
from django.urls import path
from .views import UserCreateView,ViewWeatherReords,UserLogin,CreateWeatherRecords,UpdateorDeleteWeatherRecord

urlpatterns = [
    path('register/', UserCreateView.as_view(),name='user-registration'),
    path('weather_records/', ViewWeatherReords.as_view(),name='weather-records'),
    path('login/',UserLogin.as_view(),name='user-login'),
    path('create_weather_record/',CreateWeatherRecords.as_view(),name='create-weather-record'),
    path('update_or_delete_weather_record/<int:record_id>/',UpdateorDeleteWeatherRecord.as_view(),name='update-or-delete-weather-record')


]
