import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Prepare the registration data
      const registrationData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        isAdmin: formData.isAdmin ? 1 : 0  // Convert boolean to 1/0 for SQLite
      };

      console.log('Attempting to register with data:', registrationData);

      // Make the registration request
      const response = await fetch('http://localhost:555/user/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      // Get the response text first
      const responseText = await response.text();
      console.log('Raw server response:', responseText);

      // Try to parse it as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.log('Failed to parse response as JSON:', e);
        data = { message: responseText };
      }

      console.log('Processed server response:', data);

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registration failed');
      }

      // If we get here, registration was successful
      setSuccess('Registration successful! Redirecting to login...');
      console.log('Registration successful:', data);
      
      // Clear the form
      setFormData({
        name: '',
        email: '',
        password: '',
        isAdmin: false
      });

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      <h3>User Registration</h3>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={registerUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <br />
        <label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
            disabled={loading}
          />
          Admin
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;