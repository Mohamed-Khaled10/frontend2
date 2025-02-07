import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loginData = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      };

      console.log('Attempting to login with:', loginData);

      const response = await fetch('http://localhost:555/user/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
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
        throw new Error(data.message || data.error || 'Login failed');
      }

      // Login successful
      console.log('Login successful:', data);

      const isAdmin = data.admin === 1;
      console.log('Setting admin status:', { raw: data.admin, isAdmin });

      // For now, use a placeholder token since server doesn't send one
      const placeholderToken = `user_${data.id}_${Date.now()}`;
      localStorage.setItem('authToken', placeholderToken);
      localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');

      // Force a page reload to update the navbar
      window.location.reload();
      
      // Then redirect based on admin status
      setTimeout(() => {
        window.location.href = isAdmin ? '/add-court' : '/';
      }, 100);
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      <h3>User Login</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={loginUser}>
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
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;