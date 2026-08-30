import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function PatientRecordPage() {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
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

                setPatient(response.data);
            } catch (error) {
                setError("Unable to load patient record");
            }
        };

        getPatient();
    }, [patientId]);

    if (error) {
        return (
            <>
                <Navbar />
                <main className="page-container">
                    <p className="error-message">{error}</p>
                </main>
            </>
        );
    }

    if (!patient) {
        return (
            <>
                <Navbar />
                <main className="page-container">
                    <p>Loading patient record...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <main className="page-container">
                <div className="patient-record-header">
                    <h1>Patient Record: {patient.name}</h1>

                    <div className="patient-record-actions">
                        <button>Transfer</button>
                        <button>Discharge</button>
                    </div>
                </div>

                <section className="record-section">
                    <div className="record-section-header">
                        <h2>Basic Details</h2>
                        <button
                            onClick={() =>
                                navigate(`/patients/${patientId}/edit`)
                            }
                        >
                            Edit
                        </button>
                    </div>

                    <p>
                        <strong>Name:</strong> {patient.name}
                    </p>

                    <p>
                        <strong>Date of Birth:</strong>{" "}
                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>Gender:</strong> {patient.gender}
                    </p>

                    <p>
                        <strong>Contact Number:</strong> {patient.contactNumber}
                    </p>

                    <p>
                        <strong>Ward:</strong>{" "}
                        {patient.ward?.name || "Not assigned"}
                    </p>
                </section>

                <section className="record-section">
                    <div className="record-section-header">
                        <h2>Current Medications</h2>
                        <button>Edit</button>
                    </div>

                    <p>No medications recorded.</p>
                </section>

                <section className="record-section">
                    <div className="record-section-header">
                        <h2>Diagnosis</h2>
                        <button>Edit</button>
                    </div>

                    <p>No diagnosis recorded.</p>
                </section>

                <section className="record-section">
                    <div className="record-section-header">
                        <h2>History</h2>
                        <button>Edit</button>
                    </div>

                    <p>No history recorded.</p>
                </section>
            </main>
        </>
    );
}

export default PatientRecordPage;
