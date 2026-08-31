import { useEffect, useState } from 'react';
import axios from 'axios';

function WardList() {
  const [wards, setWards] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getWards = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          '/api/wards',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setWards(response.data);
      } catch (error) {
        setError('Unable to load wards');
      }
    };

    getWards();
  }, []);

  return (
    <div className="ward-list">
      <h2>Hospital Wards</h2>

      {error && <p className="login-error">{error}</p>}

      {wards.map((ward) => (
        <div className="ward-card" key={ward._id}>
          <h3>{ward.name}</h3>
          <p>{ward.type}</p>
          <p>Capacity: {ward.capacity}</p>
        </div>
      ))}
    </div>
  );
}

export default WardList;