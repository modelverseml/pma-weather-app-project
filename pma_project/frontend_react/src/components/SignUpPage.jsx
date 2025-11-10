import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { DOMAIN_API } from '../config'

function SignUpPage() {

    const [userData,setUserData] = useState({
        'username':'',
        'email':'',
        'password':'',
        'repassword':''
    })

    const [error, setError] = useState('');

    const navigate = useNavigate()
    const [passwordmatch, comaprePassword] = useState('')
    const [isDisabled,setDisable] = useState(true)

    const updateUserData = (e) => {
        setUserData(prev => {
            const updated = { ...prev, [e.target.name]: e.target.value }

            if (updated.password && updated.repassword) {
                if (updated.password !== updated.repassword) {
                    comaprePassword(`Passwords didn't match`)
                    setDisable(true)
                } else {
                    comaprePassword('')
                    setDisable(false)
                }
            } else {

                setDisable(true)
            }

            return updated
        })
    }

    const handleSubmit = (e)=>{

        e.preventDefault()
        
        fetch(`${DOMAIN_API}/register/`,{
            method : "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(userData)
            
        }).then((response)=>{
            if(!response.ok) return Promise.reject('HTTP Error ' + response.status);
            return response.json()
        }).then((data)=>{
            if (data?.is_user_created){
                localStorage.setItem("username", data.username);
                navigate("/weather-records");
            }
            setError(data?.message || "Something went wrong.");


        }).catch((error)=>{
            setError(error);
        });

    }


  return (
    <>
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="card shadow-lg p-4" style={{ maxWidth: "450px", width: "100%" }}>
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Login to Weather App </h2>
                
                 {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    
                    <div className='mb-3 '>
                        <label htmlFor="Username" className="form-label">Username</label>
                        <input required  type="text" className='form-control' id='Username' placeholder='Username' name='username' value={userData.username} onChange={updateUserData} />
                    </div>

                    <div className='mb-3 '>
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input  type="email" className='form-control' id='Email' placeholder='Email' name='email' value={userData.email} onChange={updateUserData} />
                    </div>

                    <div className='mb-3 '>
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input required minLength={8}  type="password" className='form-control' id='Password' name='password'  value={userData.password} onChange={updateUserData} />
                    </div>

                    <div className='mb-3 '>
                        <label htmlFor="Repassword" className="form-label">Re-enter Password</label>
                        <input required type="password" className='form-control' id='examplerePassword' name='repassword' value={userData.repassword} onChange={updateUserData} />
                        {passwordmatch && (<small className="text-danger">{passwordmatch}</small>) }
                    </div>
    
                    <div className='d-flex justify-content-between'>
                        <button disabled={isDisabled} type="submit" className="btn btn-btn btn-primary w-50 me-2">Create</button>
                        <button type="button" className="btn btn-btn btn-secondary w-50" onClick={() => navigate('/')}>Login</button>
                    </div>

                </form>
            </div>
        </div>
    </div>

    </>
    
  )
}

export default SignUpPage