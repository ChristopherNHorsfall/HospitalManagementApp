const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Ward", wardSchema);
