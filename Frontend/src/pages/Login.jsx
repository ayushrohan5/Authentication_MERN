import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils'; // adjust path as needed
import { ToastContainer } from 'react-toastify';
import '../index.css'

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

 

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const res = await axios.post('http://localhost:8080/auth/login', formData);

      // Call your global success handler
      const result = res.data;
      //  console.log(result);
      
      handleSuccess(result.message);
      
      // Store token and navigate
      const { jwtToken, email, name } = res.data;
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('email', email);
      localStorage.setItem('name', name);

      setTimeout(() => {
        navigate('/home');
    }, 1000);
    } catch (err) {
                handleError(err.response.data.message|| err);
            }
  };

  return (
    <>
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>

       

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="login-button">
            Log In
          </button>
          <div className='new-user'>
          <span>New user then ?  <Link to="/signup">Signup</Link></span></div>
        </form>
      </div>
      <ToastContainer/>
    </div>
    </>
  );
};

export default Login;
