import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function PatientAdmissionPage() {
    const { wardId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [submitError, setSubmitError] = useState("");

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

        console.log({
            name,
            dateOfBirth,
            gender,
            contactNumber,
            ward: wardId,
        });

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "/api/patients",
                {
                    name,
                    dateOfBirth,
                    gender,
                    contactNumber,
                    ward: wardId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setSuccessMessage("Patient admitted successfully");

            setTimeout(() => {
                navigate(`/wards/${wardId}`);
            }, 1000);
        } catch (error) {
            if (error.response?.data?.message) {
                setSubmitError(error.response.data.message);
            } else {
                setSubmitError("Unable to admit patient");
            }
        }
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
                    {successMessage && (
                        <p className="success-message">{successMessage}</p>
                    )}

                    {submitError && (
                        <p className="error-message">{submitError}</p>
                    )}
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

                    <div className="form-actions">
                        <button type="submit">Admit Patient</button>

                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default PatientAdmissionPage;
