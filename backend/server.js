const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const wardRoutes = require('./routes/wardRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use('/api/wards', wardRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Hospital Management API is running" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
