import React from 'react';
import './Homepage.css';

const Homepage = () => {
    return (
        <div className="homepage">
            <h1>Welcome to Courts Booking</h1>
            <p>Find and book your perfect court today!</p>
            <div className="features">
                <div className="feature">
                    <h2>Book Courts</h2>
                    <p>Easy and quick court booking</p>
                </div>
                <div className="feature">
                    <h2>View Availability</h2>
                    <p>Check court availability in real-time</p>
                </div>
                <div className="feature">
                    <h2>Manage Bookings</h2>
                    <p>View and manage your bookings</p>
                </div>
            </div>
        </div>
    );
}

export default Homepage;