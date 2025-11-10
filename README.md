# PMA Weather App

A full-stack weather application developed using **Django** for the backend and **React** for the frontend. This project allows users to view weather data via API, download reports, and manage their weather records. Unauthenticated users can also access the Weather API page in a limited mode.

---

## Project Overview

The PMA Weather App provides:

- Weather information for a given city, ZIP code, or GPS coordinates  
- Ability to download weather data in CSV, Excel, PDF, or JSON formats  
- User authentication to manage personal weather records  
- Public access to the Weather API page without login  


---

## Features

- User authentication: Login and Signup  
- Weather data retrieval from OpenWeather API  
- Location validation using OpenStreetMap Nominatim API  
- Downloadable weather reports in multiple formats: CSV, Excel, PDF, JSON  
- Responsive and user-friendly React UI  
- Display of logged-in username and logout option  
- Public access to Weather API page for guest users  

---

## Installation and Setup

1. Clone the project
   
2. **Create virtual environment** and install the packages mentioned in the `requirements.txt`.

3. **Create SQL database** and provide the credentials in the Django `settings.py` file.

4. **Install Node packages**:
   - Move to the React frontend folder:
     ```bash
     cd pma_project/fronend_react
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Build the frontend:
     ```bash
     npm run build
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

5. **Run Django server**:
   - Activate the virtual environment:
     ```bash
     source venv/bin/activate     
     ```
   - Move to the Django project folder:
     ```bash
     cd pma_project/pma_project
     ```
   - Run the server:
     ```bash
     python3 manage.py runserver
     ```

6. **Open the application**:
   - Once both Django and React servers are running, open your browser and go to:
     ```
     http://localhost:5173/
     ```

---
