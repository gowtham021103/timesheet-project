// server.js
const express = require('express');
const app = express();
const PORT = 4000; // change 3000 to 4000


// Middleware to parse JSON data from requests
app.use(express.json());

// Sample timesheet entries (in-memory)
let timesheets = [];

// Routes

// GET / => simple welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Timesheet App!');
});

// GET /timesheets => list all timesheet entries
app.get('/timesheets', (req, res) => {
  res.json(timesheets);
});

// POST /timesheets => add a new timesheet entry
app.post('/timesheets', (req, res) => {
  const { name, hours, date } = req.body;
  if (!name || !hours || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const entry = { id: timesheets.length + 1, name, hours, date };
  timesheets.push(entry);
  res.status(201).json(entry);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
