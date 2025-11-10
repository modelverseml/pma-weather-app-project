from django.shortcuts import render
from django.views import View
from django.db import transaction
import json
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.contrib.auth.models import User

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# Create your views here.

from .models import WeatherRecord

@method_decorator(csrf_exempt, name='dispatch')
class UserLogin(View):

    def post(self,request, *args,**kwargs):

        try:

            data = json.loads(request.body)

            username = data.get("username")
            password = data.get("password")

            user = authenticate(username=username, password=password)

            if user is not None:
                return JsonResponse({'user_exists':True,"message": "Login successful", "username": user.username}, status=200)
            else:
                return JsonResponse({"user_exists":False,"message": "Invalid username or password"}, status=200)
            
        except Exception as e:

            return JsonResponse({"user_exists":False,"message": str(e)}, status=200)


@method_decorator(csrf_exempt, name='dispatch')
class UserCreateView(View):

    def post(self,request,*args, **kwargs):

        try: 
            with transaction.atomic():

                data = json.loads(request.body)
                username = data.get('username')
                password = data.get('password')

                if not username or not password :
                    return JsonResponse({'error': 'All fields are required'}, status=400)

                if User.objects.filter(username=username).exists():
                    return JsonResponse({'error': 'Username already exists'}, status=400)

                user = User.objects.create_user(username=username, password=password)
                user.save()

                return JsonResponse({'is_user_created':True,'message': 'User created successfully',"username": user.username}, status=200)

        except Exception as e:
                
                return JsonResponse({'is_user_created':False,'message': str(e)}, status=200)
        

class ViewWeatherReords(View):
     
    def get(self, request):

        try:
            weather_records = list(WeatherRecord.objects.all().values('id','location','start_date','end_date','average_temperature'))
            
            return JsonResponse({'is_weather_records_exists':True,'weather_records':weather_records},status = 200)
        
        except Exception as e:

            return JsonResponse({'is_weather_records_exists':False,'message':str(e)},status = 200)


@method_decorator(csrf_exempt, name='dispatch')
class UpdateorDeleteWeatherRecord(View):

    def get(self,request,record_id,*args, **kwargs):

        try:

            weather_records = list(WeatherRecord.objects.filter(id = record_id).values('id','location','start_date','end_date','average_temperature'))

            return JsonResponse({'weather_record':weather_records[0] if weather_records else {}},status = 200)
        except:
            return JsonResponse({'weather_record':{}},status = 500)
        
    def put(self,request,record_id,*args,**kwargs):

        try:
            with transaction.atomic():

                data = json.loads(request.body)

                weather_data = {
                    'location' : data.get('location'),
                    'start_date': data.get('start_date'),
                    'end_date': data.get('end_date'),
                    'average_temperature': data.get('average_temperature')
                }

                WeatherRecord.objects.filter(id = record_id).update(**weather_data)

                return JsonResponse({'is_record_created_or_updated':True,'message':'Sucessfully updated'},status = 200)

              
        except Exception as e:
            return JsonResponse({'is_record_created_or_updated':False,'message':str(e)},status = 200)
        
    def delete(self, request, record_id,*args,**kwargs):

        try:
            
            WeatherRecord.objects.get(pk=record_id).delete()

            return JsonResponse({ 'is_deleted':True,"message": "Record deleted"},status=200)
        
        except  Exception as e:
            return JsonResponse({'is_deleted':False,"message": str(e)}, status=200)

        


@method_decorator(csrf_exempt, name='dispatch')
class CreateWeatherRecords(View):

    def post(self,request):
        
        try:
            with transaction.atomic():

                data = json.loads(request.body)

                weather_data = {
                    'location' : data.get('location'),
                    'start_date': data.get('start_date'),
                    'end_date': data.get('end_date'),
                    'average_temperature': data.get('average_temperature')
                }
              
                WeatherRecord.objects.create(**weather_data)

                return JsonResponse({'is_record_created_or_updated':True,'message':'Record Created'},status = 200)

              
        except Exception as e:
            return JsonResponse({'is_record_created_or_updated':False,'message':str(e)},status = 200)



