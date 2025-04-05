import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import axios from 'axios';

const SignUp = () => {
    const [signupInfo, setsignupInfo] = useState({
        name:'',
        email:'',
        password:''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        const copysignupInfo = {...signupInfo};
        copysignupInfo[name] = value;
        setsignupInfo(copysignupInfo);
        
    }
    

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError("All fields are required");
        }
    
        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await axios.post(url, signupInfo, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const result = response.data;
            // console.log(result);
            const { success, message, error } = result;
            console.log(error);
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else if (error) {
                let details = error?.details[0].message;
                handleError(details);
                
            } else if (!success) {
                handleError(message);
            }
    
        } catch (err) {
            handleError(err.response?.data?.error?.details[0].message || err);
            console.log(err.response?.data?.message);
        }
    }
    
  return (
   <>
   <div className='signup-wrapper'>
   <div className='container signup-container'>
    <h1>SignUp</h1>
    <form onSubmit={handleSignup}>
        <div>
            <label htmlFor='name'>Name</label>
            <input onChange={handleChange} value={signupInfo.name} type="text" name='name' autoFocus placeholder='Enter your name'/>
        </div>
        <div>
            <label htmlFor='email'>Email</label>
            <input onChange={handleChange} value={signupInfo.email} type="email" name='email' placeholder='Enter your email'/>
        </div>
        <div>
            <label htmlFor='password'>Passsword</label>
            <input onChange={handleChange} value={signupInfo.password} type="password" name='password' placeholder='Enter your password'/>
        </div>
        <button type='submit' className="animated-button">Signup</button>
        <span>Already have an account ?<Link to="/login">Login</Link></span>
    </form>
    
    </div> 
    <ToastContainer/>
    </div> 
   </>
  )
}

export default SignUp