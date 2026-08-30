const express = require("express");
const {
    getPatientsByWard,
    getPatientById,
    createPatient,
    updatePatient,
} = require("../controllers/patientController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/ward/:wardId", protect, getPatientsByWard);
router.get("/:patientId", protect, getPatientById);

router.put("/:patientId", protect, updatePatient);

router.post("/", protect, authorizeRoles("doctor"), createPatient);
module.exports = router;
