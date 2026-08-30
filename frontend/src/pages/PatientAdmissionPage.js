import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function PatientAdmissionPage() {
  const { wardId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Patient creation API will be implemented in a later subtask.
    console.log({
      name,
      dateOfBirth,
      gender,
      contactNumber,
      ward: wardId
    });
  };

  const handleCancel = () => {
    navigate(`/wards/${wardId}`);
  };

  return (
    <>
      <Navbar />

      <main className="page-container">
        <h1>Admit New Patient</h1>
        <p>Enter the patient's details below.</p>

        <form className="patient-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="name">Patient Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">
              Admit Patient
            </button>

            <button
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

        </form>
      </main>
    </>
  );
}

export default PatientAdmissionPage;