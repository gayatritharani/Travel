// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/book', (req, res) => {
  const { pickup, drop, date, time } = req.body;
  console.log('Received booking:', { pickup, drop, date, time });
  res.json({ message: 'Booking received successfully!' });
});
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});
