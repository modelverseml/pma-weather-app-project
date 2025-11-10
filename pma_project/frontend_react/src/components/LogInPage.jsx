import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DOMAIN_API } from "../config";
import "../assets/css/LoginPage.css";

export default function LoginPage() {
    const [formData, setFormdata] = useState({
        'username':'',
        'password':''
    })
    const [credentialsmatch, setCredentialsMatch] = useState('');
    const [error,setError] = useState('')

    const navigate = useNavigate();

    const handleSubmit = (e) => {

        setError('');
        setCredentialsMatch('');

        e.preventDefault();
    
        fetch(`${DOMAIN_API}/login/`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(formData),
        })
        .then((response) =>{
            if (!response.ok) return Promise.reject('HTTP Error ' + response.status);
            return response.json()
        })
        .then((data)=>{
            if (data?.user_exists){
                localStorage.setItem("username", data.username);
                navigate("/weather-records");
            } 
            else setCredentialsMatch(data?.message || "Something went wrong.");
        })
        .catch((error)=>{
            setError(error);
        });
    };

  return (
    <div className="full-page d-flex align-items-center justify-content-center">
        <div className="card shadow-lg rounded overflow-hidden"
        style={{ maxWidth: "900px", width: "100%" }}>
            <div className="row g-0">
                <div className="col-md-6 bg-primary text-light d-flex flex-column justify-content-center p-5">
                    <h1 className="fw-bold mb-3">Welcome to Weather App</h1>
                    <p className="mb-4">
                    Get weather information, explore data, and download reports.
                    </p>

                    <div className="d-flex gap-2 flex-wrap">
                    <Link to="/weather-api" className="btn btn-outline-light">
                        🌐 Explore Weather API
                    </Link>
                    </div>
                </div>

                <div className="col-md-6 bg-light d-flex flex-column justify-content-between p-5">
                    
                    <h2 className="mb-4 text-center text-primary">Login to Your Account</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label"> Username </label>
                            
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                                value={formData.username}
                                onChange={(e) => setFormdata({...formData,'username':e.target.value})}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"> Password </label>
                            
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) => setFormdata({...formData,'password':e.target.value})}
                                required
                            />

                            {credentialsmatch && (<small className="text-danger">{credentialsmatch}</small>)}

                        </div>

                        <div className="d-flex flex-column flex-md-row gap-2 justify-content-center">
                            <button type="submit" className="btn btn-primary w-100 w-md-auto"> Login</button>
                            <button
                                type="button"
                                className="btn btn-secondary w-100 w-md-auto"
                                onClick={() => navigate("/signup")}
                            >New User?
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-4 text-center">
                        <hr />
                        <p className="mb-1 fw-bold">Created by Mahesh Babu Vanguri</p>
                        <p className="small text-muted">
                            PM Accelerator: Product Manager Accelerator is a company focused on helping aspiring Product Managers grow their careers. 
                            Learn more on <a href="https://www.linkedin.com/school/pmaccelerator/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
