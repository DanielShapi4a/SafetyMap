// // src/components/DataDisplay.js
// import React, { useState, useEffect } from 'react';
// import { fetchData } from '../services/api';

// const DataDisplay = () => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     const fetchDataFromApi = async () => {
//       try {
//         const jsonData = await fetchData();
//         setCountries(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchDataFromApi();
//   }, []);

//   return (
//     <div>
//       <h1>Data from MongoDB:</h1>
//       <ul>
//         {countries.map(country => (
//           <li key={country._id}>
//             <strong>{country.Country}</strong>
//             <ul>
//               <li>Warning Level: {country['warning level']}</li>
//               <li>Recommendation: {country.recommendation}</li>
//               <li>Threatened Area: {country['the threatened area']}</li>
//               <li>Detail: {country.detail}</li>
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DataDisplay;
