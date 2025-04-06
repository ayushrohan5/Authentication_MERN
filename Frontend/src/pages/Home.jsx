import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const isLoggedIn = !!localStorage.getItem('token');

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get('http://localhost:8080/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:8080/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      handleSuccess(res.data.message);
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('name');

      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  return (
    <div className="home-container full-bg">
      <h1>🏠 Welcome to Home Page</h1>

      {isLoggedIn ? (
        <>
          <button className="btn logout-btn" onClick={handleLogout}>
            Logout
          </button>

          <div className="product-list">
            <h2>📦 Products</h2>
            {products.length === 0 ? (
              <p>Loading products...</p>
            ) : (
              <ul>
                {products.map((product, index) => (
                  <li key={index}>
                    <strong>{product.name}</strong>: ₹{product.price}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <div className="button-group">
          <Link to="/login" className="btn cool-btn">Login</Link>
          <Link to="/signup" className="btn cool-btn">Signup</Link>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
