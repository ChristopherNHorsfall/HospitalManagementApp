const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();
const protect = require("../middleware/authMiddleware"); // temporary
const authorizeRoles = require("../middleware/roleMiddleware");

router.post("/login", login);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Authenticated request successful",
        user: req.user,
    });
});
/*
router.get("/doctor-test", protect, authorizeRoles("doctor"), (req, res) => {
    res.json({
        message: "Doctor access granted",
    });
});

router.get("/nurse-test", protect, authorizeRoles("nurse"), (req, res) => {
    res.json({
        message: "Nurse access granted",
    });
});
*/
module.exports = router;
