const express = require('express');
const { getWards } = require('../controllers/wardController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getWards);

module.exports = router;