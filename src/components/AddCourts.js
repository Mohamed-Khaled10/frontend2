import React, { useState } from 'react';

const AddCourtForm = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState(''); 

  const addCourt = () => {
    fetch('http://localhost:555//court/addcourt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, location, price, quantity }), 
      credentials:"include"
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to add court. status code ${response.status}, message
          ${JSON.stringify(response.text())}`);
      }
      setMessage('Court added successfully');
      alert('Court added successfully'); 
    })
    .catch((error) => {
      setMessage(`Error: ${error.message}`); 
      alert(error.message); 
    });
  };
  return (
    <div className="form-section">
      <h3>Add Court (Admin)</h3>
      <form>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        /><br />
        <input 
          type="text" 
          placeholder="Location" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          required 
        /><br />
        <input 
          type="Real" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        /><br />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        /><br />
        <button type="button" onClick={addCourt}>Add Court</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
};

export default AddCourtForm;