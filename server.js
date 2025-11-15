// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/smallcab", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Booking schema
const bookingSchema = new mongoose.Schema({
  pickup: String,
  drop: String,
  date: String,
  time: String,
  pickupCoords: {
    lat: Number,
    lon: Number
  },
  dropCoords: {
    lat: Number,
    lon: Number
  },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

// Root route
app.get("/", (req, res) => {
  res.send("🚕 SmallCab Backend is Live!");
});

// Create booking
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({
      message: "Booking Confirmed!",
      bookingId: booking._id
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving booking" });
  }
});

// Get all bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

app.listen(PORT, () => {
  console.log(`🚕 SmallCab Backend running at http://localhost:${PORT}`);
});n
