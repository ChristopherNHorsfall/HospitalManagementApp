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

module.exports = { getPatientsByWard };
