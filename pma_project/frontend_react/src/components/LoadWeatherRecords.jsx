import React, { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import { DOMAIN_API } from '../config'
import Header from './Header'
import Exports from './Exports'


function LoadWeatherRecords() {
    const [records, setRecords] = useState([])
    const navigate = useNavigate()
    const [error,setError] = useState('')
    

    useEffect(() => {
        
        fetch(`${DOMAIN_API}/weather_records/`)
        .then((response) => {
            if (!response.ok) return Promise.reject('HTTP Error ' + response.status);
            return response.json()
        })
        .then((data) => {
            if(data?.is_weather_records_exists)setRecords(data.weather_records)
            else setError(data?.message)
            
        })
        .catch((error)=>{
            setError(error)
        })
    }, []);

    const deleteRecord = (id)=>{

        fetch(`${DOMAIN_API}/update_or_delete_weather_record/${id}/`,{
            method : 'DELETE',
        }).then((response)=>{
            if (!response.ok) return Promise.reject('HTTP Error ' + response.status);
            return response.json()
        }).then((data)=>{
            if(data?.is_deleted)setRecords(records.filter((rec) => rec.id !== id));
            else setError(data?.message);
        }).catch((error)=>{
            setError(error);
        });
    }


  return (
    <>

    <div className='container-fluid min-vh-100 bg-light p-4'>
        <Header />
        <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-10">
                <div className="card shadow-lg rounded">
                    <div className="card-body">

                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                         
                            <h2 className="card-title text-primary mb-0 fw-bold">
                                🌦️ Weather Data
                            </h2>

                            <div className="d-flex flex-wrap gap-2 align-items-center">
                            
                                <Exports data={records} />
                                <button
                                className="btn btn-success d-flex align-items-center gap-2"
                                onClick={() => navigate("/create-weather-record")}
                                >
                                ➕ Add Weather Record
                                </button>
                            </div>
                        
                        </div>
                   
                        {error && <div className="d-flex flex-column flex-md-row  alert alert-danger">{error}</div>}
                       
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle">
                                <thead className='table-dark'>
                                    <tr>
                                        <th scope="col">Location</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">End Date</th>
                                        <th scope="col">Average Temperature</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody > 
                                    {records.map((rec) => (
                                        <tr key={rec.id}>
                                            <td>{rec.location}</td>
                                            <td>{rec.start_date}</td>
                                            <td>{rec.end_date}</td>
                                            <td>{rec.average_temperature}</td>
                                            <td className="d-flex gap-2">                            
                                                <button type="button" className="btn btn-primary btn-sm" onClick={()=> navigate(`/update-weather-record/${rec.id}`)}>Edit</button>
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteRecord(rec.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default LoadWeatherRecords