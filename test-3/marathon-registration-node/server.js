const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

const app = express();

// Middleware to parse URL-encoded bodies (from form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Set up session middleware (this should be before any middleware that needs it)
app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS in production
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const mongoURI = 'mongodb://mongo:27017/marathon';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define the participant schema and model
const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  distance: { type: String, required: true },
  medical: { type: String },
  registrationDate: { type: Date, default: Date.now },
});

const Participant = mongoose.model('Participant', participantSchema);

// Serve the registration form (GET route)
app.get('/', (req, res) => {
  res.render('form');
});

// Handle form submission for registration (POST route)
app.post('/register', async (req, res) => {
    let { name, email, age, distance, medical } = req.body;
  
    // Convert age to a number
    age = Number(age); // Convert string to number
  
    // Validate input fields
    if (!name || !email || !age || !distance) {
      return res.status(400).json({ success: false, error: 'Name, email, age, race and distance required' });
    }
  
    try {
      // Create a new participant and save to database
      const newParticipant = new Participant({ name, email, age, distance, medical });
      await newParticipant.save();
  
      // Respond with success message as JSON
      res.status(200).json({ success: true, message: 'Registration successful' });
    } catch (err) {
      // Respond with error message if something goes wrong
      res.status(500).json({ success: false, error: 'Error saving participant' });
    }
  });

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
