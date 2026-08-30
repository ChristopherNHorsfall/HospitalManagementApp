import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import DischargeConfirmation from "../components/DischargeConfirmation";
import TransferPatientModal from "../components/TransferPatientModal";

function WardPatientsPage() {
    const { wardId } = useParams();
    const navigate = useNavigate();
    const [ward, setWard] = useState(null);

    const [patients, setPatients] = useState([]);
    const [patientToDischarge, setPatientToDischarge] = useState(null);
    const [error, setError] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const [successMessage, setSuccessMessage] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [patientToTransfer, setPatientToTransfer] = useState(null);
    const [showTransferModal, setShowTransferModal] = useState(false);

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

    const handleDischarge = async () => {
        try {
            setSuccessMessage("");
            setSubmitError("");
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/patients/${patientToDischarge._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            const dischargedName = patientToDischarge.name;

            setPatients(
                patients.filter(
                    (patient) => patient._id !== patientToDischarge._id,
                ),
            );

            setPatientToDischarge(null);
            setSuccessMessage(`${dischargedName} discharged successfully`);
        } catch (error) {
            setPatientToDischarge(null);

            if (error.response?.data?.message) {
                setSubmitError(error.response.data.message);
            } else {
                setSubmitError("Unable to discharge patient");
            }
        }
    };

    const handleTransfer = async (destinationWardId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.patch(
                `http://localhost:5000/api/patients/${patientToTransfer._id}/transfer`,
                {
                    ward: destinationWardId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setPatients(
                patients.filter(
                    (patient) => patient._id !== patientToTransfer._id,
                ),
            );

            setPatientToTransfer(null);
        } catch (error) {
            console.error("Unable to transfer patient:", error);
        }
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

                    {user?.role === "doctor" && (
                        <button
                            onClick={() => navigate(`/wards/${wardId}/admit`)}
                        >
                            Admit Patient
                        </button>
                    )}
                </div>

                {error && <p className="error-message">{error}</p>}
                {successMessage && (
                    <p className="success-message">{successMessage}</p>
                )}

                {submitError && <p className="error-message">{submitError}</p>}

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

                                <button
                                    onClick={() =>
                                        setPatientToTransfer(patient)
                                    }
                                >
                                    Transfer
                                </button>

                                <button
                                    onClick={() =>
                                        setPatientToDischarge(patient)
                                    }
                                >
                                    Discharge
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {patientToTransfer && (
                    <TransferPatientModal
                        patient={patientToTransfer}
                        currentWardId={wardId}
                        onCancel={() => setPatientToTransfer(null)}
                        onConfirm={handleTransfer}
                    />
                )}
                {patientToDischarge && (
                    <DischargeConfirmation
                        patient={patientToDischarge}
                        onCancel={() => setPatientToDischarge(null)}
                        onConfirm={handleDischarge}
                    />
                )}
            </main>
        </>
    );
}

export default WardPatientsPage;
