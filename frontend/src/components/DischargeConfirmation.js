function DischargeConfirmation({ patient, onCancel, onConfirm }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Confirm Discharge</h2>

                <p>
                    Are you sure you want to discharge {patient.name}?
                </p>

                <p>
                    This will remove the patient record from the system.
                </p>

                <div className="modal-actions">
                    <button onClick={onCancel}>
                        Cancel
                    </button>

                    <button onClick={onConfirm}>
                        Confirm Discharge
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DischargeConfirmation;