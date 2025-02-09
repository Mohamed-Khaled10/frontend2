import React, { useState } from 'react';
import './Courts.css';

const Courts = () => {
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  
  const sampleCourts = [
    {
      id: 1,
      name: "AL ahly club",
      location: "Madinet Nasr",
      type: "Football",
      price: 50
    },
    {
      id: 2,
      name: "Tolip Hotel",
      location: "Tagamou",
      type: "Football",
      price: 30
    },
    {
      id: 3,
      name: "Fighter court",
      location: "Obour city",
      type: "Football",
      price: 40
    },
    {
      id: 4,
      name: "Maadi club",
      location: "EL Maadi",
      type: "Football",
      price: 35
    },
    {
      id: 5,
      name: "Practice Football Field",
      location: "Sheikh zayed",
      type: "Football",
      price: 45
    },
    {
      id: 6,
      name: "Future",
      location: "Masr el gedida",
      type: "Football",
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
