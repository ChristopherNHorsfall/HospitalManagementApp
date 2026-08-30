const express = require("express");
const {
    getPatientsByWard,
    createPatient,
} = require("../controllers/patientController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/ward/:wardId", protect, getPatientsByWard);

router.post("/", protect, authorizeRoles("doctor"), createPatient);
module.exports = router;
