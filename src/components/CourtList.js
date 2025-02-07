// import React, { useState, useEffect } from 'react';

// const CourtList = () => {
//   const [court, setcourt] = useState([]);
//   const getAllCourt = () => {
//     fetch('http://localhost:555/court')
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           console.error('Failed to fetch courts');
//           return [];
//         }
//       })
//       .then((data) => {
//         setcourt(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching courts:', error);
//       });
//   };

//   useEffect(() => {
//     getAllCourt();
//   }, []);

//   return (
//     <div className="form-section">
//       <h3>View All courts</h3>
//       <button onClick={getAllCourt}>Get court</button>
//       <ul>
//         {court.map((court) => (
//           <li key={court.ID}>
//             {court.name} to {court.location} on {court.price} (court num: {court.QUANTITY})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CourtList;
