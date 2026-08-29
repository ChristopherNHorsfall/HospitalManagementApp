const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();
const protect = require("../middleware/authMiddleware"); // temporary

router.post("/login", login);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
    res.json({
        message: "Authenticated request successful",
        user: req.user,
    });
});

module.exports = router;
