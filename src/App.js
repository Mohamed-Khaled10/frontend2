import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import RegisterationForm from './components/RegisterationForm';
import Courts from './components/Courts';
import AddCourts from './components/AddCourts';
import Homepage from './components/Homepage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/courts" element={<Courts />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterationForm />} />
          <Route path="/add-court" element={<AddCourts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;