const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    ward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ward",
        required: true,
    },
});

module.exports = mongoose.model("Patient", patientSchema);
