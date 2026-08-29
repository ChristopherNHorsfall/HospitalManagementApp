import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function WardsPage() {
  const [wards, setWards] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getWards = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          'http://localhost:5000/api/wards',
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

  const viewWard = (wardId) => {
    navigate(`/wards/${wardId}`);
  };

  return (
    <>
      <Navbar />

      <main className="page-container">
        <h1>Wards</h1>

        {error && <p className="error-message">{error}</p>}

        <div className="ward-list">
          {wards.map((ward) => (
            <div className="ward-list-item" key={ward._id}>
              <div>
                <h2>{ward.name}</h2>
                <p>{ward.type}</p>
                <p>Capacity: {ward.capacity}</p>
              </div>

              <button onClick={() => viewWard(ward._id)}>
                View
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default WardsPage;