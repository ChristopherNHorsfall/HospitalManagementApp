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
    const [errors, setErrors] = useState({});

    const [successMessage, setSuccessMessage] = useState("");
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        const getPatient = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `/api/patients/${patientId}`,
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

    const handleSubmit = async (event) => {
        setSuccessMessage("");
        setSubmitError("");

        event.preventDefault();

        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Patient name is required";
        }

        if (!dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required";
        } else {
            const dob = new Date(dateOfBirth);
            const today = new Date();

            if (dob > today) {
                newErrors.dateOfBirth = "Date of birth cannot be in the future";
            }
        }

        if (!gender) {
            newErrors.gender = "Gender is required";
        }

        if (!contactNumber.trim()) {
            newErrors.contactNumber = "Contact number is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `/api/patients/${patientId}`,
                {
                    name,
                    dateOfBirth,
                    gender,
                    contactNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            setSuccessMessage("Patient details updated successfully");

            setTimeout(() => {
                navigate(`/patients/${patientId}`);
            }, 1000);
        } catch (error) {
            if (error.response?.data?.message) {
                setSubmitError(error.response.data.message);
            } else {
                setSubmitError("Unable to update patient");
            }
        }
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
                {successMessage && (
                    <p className="success-message">{successMessage}</p>
                )}

                {submitError && <p className="error-message">{submitError}</p>}

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
                        {errors.name && (
                            <p className="form-error">{errors.name}</p>
                        )}
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
                        {errors.dateOfBirth && (
                            <p className="form-error">{errors.dateOfBirth}</p>
                        )}
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
                        {errors.gender && (
                            <p className="form-error">{errors.gender}</p>
                        )}
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
                        {errors.contactNumber && (
                            <p className="form-error">{errors.contactNumber}</p>
                        )}
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
