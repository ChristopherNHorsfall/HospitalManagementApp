const Ward = require("../models/Ward");

const getWards = async (req, res) => {
    try {
        const wards = await Ward.find();

        res.status(200).json(wards);
    } catch (error) {
        console.error("Error retrieving wards:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = { getWards };
