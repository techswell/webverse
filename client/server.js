const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  });

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

// API endpoint for leave request approval/rejection
app.post('/api/approve-leave', (req, res) => {
  // Code to handle leave request approval/rejection
});

// API endpoint for complaint completion status
app.put('/api/complaint-status/:id', (req, res) => {
  // Code to handle complaint completion status
});

// API endpoint for mess change request approval/rejection
app.post('/api/approve-mess-change', (req, res) => {
  // Code to handle mess change request approval/rejection
});

// API endpoint for room assignment
app.put('/api/assign-room/:id', (req, res) => {
  // Code to handle room assignment
});

// API endpoint for course and student information
app.get('/api/courses', (req, res) => {
  // Code to retrieve course and student information from database
});

// API endpoint for event acceptance/rejection
app.post('/api/approve-event', (req, res) => {
  // Code to handle event acceptance/rejection
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true
  },
  students: {
    type: [String],
    required: true
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

const LeaveRequest = require('./models/leaveRequest');

app.post('/api/approve-leave', (req, res) => {
  const { id, status } = req.body;

 // Find the leave request by id and update its status
  LeaveRequest.findByIdAndUpdate(id, { status })
    .then(() => {
      res.json({ message: 'Leave request updated successfully' });
    })
    .catch((error) => {
      console.log('Error updating leave request', error);
      res.status(500).json({ error: 'Error updating leave request' });
    });
});