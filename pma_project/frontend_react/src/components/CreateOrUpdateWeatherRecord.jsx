import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { DOMAIN_API } from '../config';
import Header from './Header'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { validateLocation ,validateDateRange }from '../common'

function CreateOrUpdateWeatherRecord() {
    const [formData, setFormdata] = useState(
        {
            'location' : '',
            'start_date': '',
            'end_date':'',
            'average_temperature':''

        }
    )

    const [error, setError] = useState('');

    const today = new Date();

    const navigate = useNavigate();

    const updateFormData=(name,value)=>{
        setFormdata({...formData,[name]: value})
    }


    const {id} = useParams();

    useEffect(()=>{
        if(id){
            fetch(`${DOMAIN_API}/update_or_delete_weather_record/${id}/`)
            .then((response) => {
                if (!response.ok) if (!response.ok) return Promise.reject('HTTP Error ' + response.status);
                return response.json();
            })
            .then((data) => {
                setFormdata({
                    ...data.weather_record,
                    start_date: data.weather_record.start_date ? new Date(data.weather_record.start_date) : null,
                    end_date: data.weather_record.end_date ? new Date(data.weather_record.end_date) : null
                });
            }).catch((error)=>{
                setError(error);
            });
        }

    },[id])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateDateRange(formData.start_date,formData.end_date)) {
            setError("Start date must be before or equal to end date.");
            return;
        }
        let location_data = await validateLocation(formData.location)
        if (!location_data) {
            setError("Location not found. Please enter a valid location.");
            return;
        }

        const url = id
            ? `${DOMAIN_API}/update_or_delete_weather_record/${id}/`
            : `${DOMAIN_API}/create_weather_record/`;
        const method = id ? 'PUT' : 'POST';

        const payload = {
            ...formData,
            start_date: formData.start_date.toISOString().split('T')[0],
            end_date: formData.end_date.toISOString().split('T')[0]
        };

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then((response) =>{
            if (!response.ok) return Promise.reject('HTTP Error ' + response.status);
            return response.json()
        }).then((data)=>{
            if(data?.is_record_created_or_updated)navigate('/weather-records');
            else setError(data?.message || "Something went wrong.");
        }).catch((error)=>{
            setError(error);
        });
    }


  return (
    <>
        <div className='container-fluid min-vh-100 bg-light p-4'>
            <Header />
            <div className="row justify-content-center">
                <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4">
                            {id ? "Update Weather Record" : "Create Weather Record"}
                        </h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>

                            <div className='mb-3'>
                                <label htmlFor="location" className="form-label">Location</label>
                                <input required  type="text" className='form-control' id='location' 
                                placeholder='location' value={formData.location} 
                                onChange={e => updateFormData('location', e.target.value)}
                                />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="startdate" className="form-label">Start Date</label>
                                <DatePicker  selected={formData.start_date} onChange={date => updateFormData('start_date', date)}
                                        className="form-control"
                                        maxDate={today} 
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select start date"/>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="enddate" className="form-label">End Date</label>
                                <DatePicker selected={formData.end_date}
                                        onChange={date => updateFormData('end_date', date)}
                                        className="form-control"
                                        maxDate={today}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select end date"
                                    />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="temperature" className="form-label">Temperature </label>
                                <input required type="number" className='form-control' 
                                id='average_temperature' 
                                 value={formData.average_temperature}
                                  onChange={e => updateFormData('average_temperature', e.target.value)} />
                            </div>
                            
                            <div className='d-flex justify-content-between'>
                                <button  type="submit" className="btn btn-primary"> {id? 'Update':'Create' }</button>
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/weather-records')}>Cancel</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}


export default CreateOrUpdateWeatherRecord