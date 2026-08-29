const express = require('express');
const { getPatientsByWard } = require('../controllers/patientController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/ward/:wardId', protect, getPatientsByWard);

module.exports = router;