import { useEffect, useState } from "react";
import axios from "axios";

function TransferPatientModal({ patient, currentWardId, onCancel, onConfirm }) {
    const [wards, setWards] = useState([]);
    const [selectedWardId, setSelectedWardId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const getWards = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "/api/wards",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                // Do not allow transfer to the ward the patient is already in
                const availableWards = response.data.filter(
                    (ward) => ward._id !== currentWardId,
                );

                setWards(availableWards);
            } catch (error) {
                setError("Unable to load wards");
            }
        };

        getWards();
    }, [currentWardId]);

    const handleConfirm = () => {
        if (!selectedWardId) {
            setError("Please select a destination ward");
            return;
        }
        if (selectedWardId === currentWardId) {
            setError("Patient is already assigned to this ward");
            return;
        }

        onConfirm(selectedWardId);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Transfer Patient</h2>

                <p>
                    Transfer <strong>{patient.name}</strong> to another ward.
                </p>

                <div className="form-group">
                    <label htmlFor="destinationWard">Destination Ward</label>

                    <select
                        id="destinationWard"
                        value={selectedWardId}
                        onChange={(event) =>
                            setSelectedWardId(event.target.value)
                        }
                    >
                        <option value="">Select a ward</option>

                        {wards.map((ward) => (
                            <option key={ward._id} value={ward._id}>
                                {ward.name}
                            </option>
                        ))}
                    </select>
                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="modal-actions">
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>

                    <button type="button" onClick={handleConfirm}>
                        Confirm Transfer
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransferPatientModal;
