import { useState } from 'react'
import './App.css'
import SignUpPage from './components/SignUpPage'
import '../src/assets/css/style.css'
import LoadWeatherRecords from './components/LoadWeatherRecords'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage'
import CreateOrUpdateWeatherRecord from './components/CreateOrUpdateWeatherRecord'
import WeatherApi from './components/WeatherApi'




function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/weather-records" element={<LoadWeatherRecords />} />
        <Route path="/create-weather-record" element={<CreateOrUpdateWeatherRecord />} />
        <Route path="/update-weather-record/:id" element={<CreateOrUpdateWeatherRecord />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/weather-api" element={<WeatherApi />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
