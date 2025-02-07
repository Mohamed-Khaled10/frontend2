import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      
      const response = await fetch('http://localhost:555/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        })
      });

      const data = await response.json();
      console.log('Login Response:', {
        fullResponse: data,
        adminField: {
          value: data.admin,
          type: typeof data.admin
        }
      });

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed');
      }

      
      const isAdmin = data.admin === 1;
      console.log('Admin Status Check:', { 
        rawAdminValue: data.admin,
        rawAdminType: typeof data.admin,
        comparison: `${data.admin} === 1`,
        comparisonResult: data.admin === 1,
        finalIsAdmin: isAdmin
      });

      
      const placeholderToken = `user_${data.id}_${Date.now()}`;
      localStorage.setItem('authToken', placeholderToken);
      localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');

      console.log('LocalStorage After Login:', {
        authToken: localStorage.getItem('authToken'),
        isAdmin: localStorage.getItem('isAdmin')
      });

      
      window.location.reload();
      
      
      setTimeout(() => {
        window.location.href = isAdmin ? '/add-court' : '/';
      }, 100);
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      <h3>Login</h3>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
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