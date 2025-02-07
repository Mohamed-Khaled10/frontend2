import React, { useState } from 'react';
import './Courts.css';

const Courts = () => {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  
  const sampleCourts = [
    {
      id: 1,
      name: "Main Football Field",
      location: "Downtown Sports Complex",
      type: "Football",
      price: 50
    },
    {
      id: 2,
      name: "Center Court Tennis",
      location: "Tennis Academy",
      type: "Tennis",
      price: 30
    },
    {
      id: 3,
      name: "Basketball Arena",
      location: "Community Center",
      type: "Basketball",
      price: 40
    },
    {
      id: 4,
      name: "Indoor Volleyball Court",
      location: "Sports Hall",
      type: "Volleyball",
      price: 35
    },
    {
      id: 5,
      name: "Practice Football Field",
      location: "Training Ground",
      type: "Football",
      price: 45
    },
    {
      id: 6,
      name: "Professional Tennis Court",
      location: "Tennis Club",
      type: "Tennis",
      price: 40
    }
  ];

  const handleBooking = (court) => {
    
    setNotification({
      show: true,
      message: `Successfully booked ${court.name}!`,
      type: 'success'
    });

    
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  return (
    <div className="courts-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <h2>Available Courts</h2>
      <div className="courts-grid">
        {sampleCourts.map(court => (
          <div key={court.id} className="court-card">
            <h3>{court.name}</h3>
            <div className="court-info">
              <p><strong>Location:</strong> {court.location}</p>
              <p><strong>Type:</strong> {court.type}</p>
              <p><strong>Price:</strong> ${court.price}/hour</p>
            </div>
            <button 
              className="book-button"
              onClick={() => handleBooking(court)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courts;
