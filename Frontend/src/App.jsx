import React from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Navigate to="/" />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
