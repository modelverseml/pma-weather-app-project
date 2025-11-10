import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import { WEATHER_TOKEN,WEATHER_DOMAIN } from '../config';
import { validateLocation,isValidZip,validateGPS } from '../common';



function WeatherApi() {

  const [method, setMethod] = useState('city');
  const [locationValue, setLocationValue] = useState('');
  const [weatherDataCheck,setWeatherDataCheck] = useState(false);
  const [weatherData,setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [error, setError] = useState('');

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocationValue(`${latitude}, ${longitude}`);
        setMethod('gps');
    });
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };


  const kelvinToCelsius = (k) => (k - 273.15).toFixed(1);
  const kelvinToFahrenheit = (k) => ((k - 273.15) * 9/5 + 32).toFixed(1);

  const handleSubmit = async (e) => {

    setError('')
    setWeatherDataCheck(false)
    e.preventDefault();
    
    let url = "";
    let displayName = "";

    if(method === 'zip'){
      if (!isValidZip(locationValue)){
        setError("Zip code/Postal code not found. Please enter a valid code.");
        return
      } 
      url = `${WEATHER_DOMAIN}zip=${locationValue}&appid=${WEATHER_TOKEN}`
      displayName = locationValue;

    }

    
    else if(method === 'city'){

      let location_data = await validateLocation(locationValue)
      if (!location_data) {
          setError("Location not found. Please enter a valid location.");
          return;
      }
      console.log('exit')
      url = `${WEATHER_DOMAIN}q=${locationValue}&appid=${WEATHER_TOKEN}`
      displayName = locationValue;
    }

    else if(method === 'gps'){

      if (!validateGPS(locationValue)) {
          setError("Invalid GPS coordinates. Please enter in format: lat(-90 to +90 ), lon(-180 to 180)");
          return;
      }
      const [lat, lon] = locationValue.split(",").map((val) => val.trim())
      url = `${WEATHER_DOMAIN}lat=${lat}&lon=${lon}&appid=${WEATHER_TOKEN}`
      displayName = `Lat: ${lat}, Lon: ${lon}`;

    }
    
    fetch(url)
    .then((response) => {
        if (!response.ok) if (!response.ok) return Promise.reject('HTTP Error ' + response.status);
        return response.json();
    })
    .then((data) => {
      setWeatherData(data);
      setLocationName(displayName);
      setWeatherDataCheck(true);
    }).catch((error)=>{
          setError(error);
    });
  };

  const clearData=()=>{
      setWeatherDataCheck(false);
      setLocationValue('');
      setMethod('city')
  }

  return (
    <>
      <div className='container-fluid min-vh-100 bg-light p-4'>
        <Header />
        <div className="row justify-content-center">
            <div className=" card shadow-lg col-md-6  rounded">
              <div className="card-body">

                <h2 className="card-title text-center mb-4">Provide Your Location</h2>
            
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">How would you like to provide your location?</label>
                      <select className="form-select" value={method} onChange={(e) => {setLocationValue('');setMethod(e.target.value)}}>
                          <option value="city">Enter City Name</option>
                          <option value="zip">Enter ZIP / Postal Code</option>
                          <option value="gps">Enter GPS Coordinates</option>
                      </select>
                    </div>

                    {method === 'city' && (
                    <div className="mb-3">
                        <label className="form-label">City Name</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Boston"
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        required
                        />
                    </div>
                    )}

                    {method === 'zip' && (
                    <div className="mb-3">
                        <label className="form-label">ZIP / Postal Code</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., 02115"
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        required
                        />
                    </div>
                    )}

                    {method === 'gps' && (
                    <div className="mb-3">
                        <label className="form-label">GPS Coordinates</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., 42.3601, -71.0589"
                        value={locationValue}
                        onChange={(e) => setLocationValue(e.target.value)}
                        required
                        />
                    </div>
                    )}

                    <div className="mb-3">
                      <button
                          type="button"
                          className="btn btn-outline-info w-100"
                          onClick={handleDetectLocation} >
                          📍 Detect My Current Location
                      </button>
                    </div>

                    {weatherDataCheck && weatherData && (
                      <div className="card shadow p-3 mt-3">
                          <h4 className="text-center">{locationName}</h4>
                          <div className="text-center">
                            <img 
                              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                              alt={weatherData.weather[0].description} 
                            />
                          </div>
                          <p><strong>Temperature:</strong> {kelvinToCelsius(weatherData.main.temp)} °C / {kelvinToFahrenheit(weatherData.main.temp)} °F</p>
                          <p><strong>Feels Like:</strong> {kelvinToCelsius(weatherData.main.feels_like)} °C</p>
                          <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
                          <p><strong>Humidity:</strong> {weatherData.main.humidity} %</p>
                          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                          <p><strong>Cloudiness:</strong> {weatherData.clouds.all} %</p>
                      </div>
                    )}

                    <div className="d-flex flex-column flex-md-row gap-2 justify-content-center">

                        <button type="submit" className="btn btn-primary w-100">
                        Get Weather Data
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary w-100 w-md-auto"
                            onClick={clearData}
                        >Clear
                        </button>
                    </div>
                </form>

              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApi