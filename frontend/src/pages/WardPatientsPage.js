import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function WardPatientsPage() {
    const { wardId } = useParams();
    const navigate = useNavigate();
    const [ward, setWard] = useState(null);

    const [patients, setPatients] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getWardData = async () => {
            try {
                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                // Get wards
                const wardsResponse = await axios.get(
                    "http://localhost:5000/api/wards",
                    config,
                );

                const selectedWard = wardsResponse.data.find(
                    (ward) => ward._id === wardId,
                );

                setWard(selectedWard);

                // Get patients belonging to this ward
                const patientsResponse = await axios.get(
                    `http://localhost:5000/api/patients/ward/${wardId}`,
                    config,
                );

                setPatients(patientsResponse.data);
            } catch (error) {
                setError("Unable to load ward information");
            }
        };

        getWardData();
    }, [wardId]);

    const viewPatient = (patientId) => {
        navigate(`/patients/${patientId}`);
    };

    return (
        <>
            <Navbar />

            <main className="page-container">
                <div className="page-header">
                    <div>
                        <h1>{ward ? ward.name : "Ward"}</h1>
                        <h3>Patients</h3>
                    </div>

                    <button>Admit Patient</button>
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="patient-list">
                    {patients.map((patient) => (
                        <div className="patient-list-item" key={patient._id}>
                            <div>
                                <h2>{patient.name}</h2>
                                <p>{patient.gender}</p>
                                <p>
                                    Date of Birth:{" "}
                                    {new Date(
                                        patient.dateOfBirth,
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="patient-actions">
                                <button
                                    onClick={() => viewPatient(patient._id)}
                                >
                                    View
                                </button>

                                <button>Transfer</button>

                                <button>Discharge</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default WardPatientsPage;
