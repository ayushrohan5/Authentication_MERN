import React from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import { Navigate, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to = "/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </div>
  )
}

export default App