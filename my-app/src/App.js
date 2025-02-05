import React from 'react';
import './App.css';
import Homepage from './Components/Homepage';
import Registrationform from './Components/Registrationform';
import LoginForm from './Components/LoginForm';
import AddFlightForm from './Components/AddCourts';
import FlightsList from './Components/CourtListList';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <h1>Courts</h1>
      <Homepage />
      <Registrationform />
      <LoginForm />
      <FlightsList />
      <AddFlightForm />
      <NavBar />
    </div>
  );
}

export default App;
