const Patient = require("../models/Patient");

const getPatientsByWard = async (req, res) => {
    try {
        const patients = await Patient.find({
            ward: req.params.wardId,
        });

        res.status(200).json(patients);
    } catch (error) {
        console.error("Error retrieving ward patients:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const createPatient = async (req, res) => {
    try {
        const { name, dateOfBirth, gender, contactNumber, ward } = req.body;

        if (!name || !dateOfBirth || !gender || !contactNumber || !ward) {
            return res.status(400).json({
                message: "All patient fields are required",
            });
        }

        const dob = new Date(dateOfBirth);

        if (dob > new Date()) {
            return res.status(400).json({
                message: "Date of birth cannot be in the future",
            });
        }

        const patient = await Patient.create({
            name,
            dateOfBirth,
            gender,
            contactNumber,
            ward,
        });

        res.status(201).json({
            message: "Patient admitted successfully",
            patient,
        });
    } catch (error) {
        console.error("Error creating patient:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    getPatientsByWard,
    createPatient,
};
