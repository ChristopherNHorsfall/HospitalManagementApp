import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function PatientEditPage() {
    const { patientId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [wardName, setWardName] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        const getPatient = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `http://localhost:5000/api/patients/${patientId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const patient = response.data;

                setName(patient.name);
                setGender(patient.gender);
                setContactNumber(patient.contactNumber);
                setWardName(patient.ward?.name || "Not assigned");

                // HTML date inputs require YYYY-MM-DD
                if (patient.dateOfBirth) {
                    setDateOfBirth(patient.dateOfBirth.substring(0, 10));
                }
            } catch (error) {
                setError("Unable to load patient details");
            }
        };

        getPatient();
    }, [patientId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Patient update API will be implemented in the next subtask.
        console.log({
            name,
            dateOfBirth,
            gender,
            contactNumber,
        });
    };

    const handleCancel = () => {
        navigate(`/patients/${patientId}`);
    };

    return (
        <>
            <Navbar />

            <main className="page-container">
                <div className="page-header">
                    <h1>Edit Patient Details</h1>

                    <button
                        type="button"
                        onClick={() => navigate(`/patients/${patientId}`)}
                    >
                        Back
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}

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
                            onChange={(event) =>
                                setDateOfBirth(event.target.value)
                            }
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
                            onChange={(event) =>
                                setContactNumber(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Current Ward</label>

                        <input type="text" value={wardName} disabled />
                    </div>

                    <div className="form-actions">
                        <button type="submit">Save Changes</button>

                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default PatientEditPage;
