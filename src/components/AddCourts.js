// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AddCourts.css';

// const AddCourts = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     location: '',
//     type: '',
//     price: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // Check for authentication when component mounts
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
//     if (!token || !isAdmin) {
//       console.log('Not authenticated or not admin. Token:', !!token, 'Admin:', isAdmin);
//       setError('You must be logged in as an admin to access this page');
//       navigate('/login');
//       return;
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError('Court name is required');
//       return false;
//     }
//     if (!formData.location.trim()) {
//       setError('Location is required');
//       return false;
//     }
//     if (!formData.type.trim()) {
//       setError('Court type is required');
//       return false;
//     }
//     if (!formData.price.trim() || isNaN(formData.price)) {
//       setError('Please enter a valid price');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:555/court/addcourt', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//         },
//         body: JSON.stringify({
//           ...formData,
//           price: parseFloat(formData.price)
//         })
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.message || data.error || 'Failed to add court');
//       }

//       setSuccess('Court added successfully!');
//       // Clear the form
//       setFormData({
//         name: '',
//         location: '',
//         type: '',
//         price: ''
//       });

//     } catch (error) {
//       console.error('Error adding court:', error);
//       setError(error.message || 'Failed to add court');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="form-section">
//       <h2>Add New Court</h2>
//       {error && <div className="error-message">{error}</div>}
//       {success && <div className="success-message">{success}</div>}
      
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Court Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             disabled={loading}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="location">Location:</label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             disabled={loading}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="type">Court Type:</label>
//           <select
//             id="type"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             disabled={loading}
//             required
//           >
//             <option value="">Select a type</option>
//             <option value="football">Football</option>
//             <option value="basketball">Basketball</option>
//             <option value="tennis">Tennis</option>
//             <option value="volleyball">Volleyball</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="price">Price per Hour:</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             disabled={loading}
//             min="0"
//             step="0.01"
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? 'Adding Court...' : 'Add Court'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCourts;