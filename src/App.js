import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Homepage from './components/Homepage';
import RegisterationForm from './components/RegisterationForm';
import LoginForm from './components/LoginForm';
import AddCourts from './components/AddCourts';
import CourtList from './components/CourtList';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<RegisterationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/add-court" element={<AddCourts />} />
          <Route path="/courts" element={<CourtList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;