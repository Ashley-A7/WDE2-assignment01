const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const mongoURI = 'mongodb://localhost:27017/marathon'; 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Marathon Registration Backend is Running!');
});

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  registrationDate: { type: Date, default: Date.now },
});

const Participant = mongoose.model('Participant', participantSchema);

app.post('/register', async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Name, email, and age are required' });
  }

  try {
    const newParticipant = new Participant({ name, email, age });
    await newParticipant.save();

    res.status(201).json({
      message: 'Registration successful',
      participant: newParticipant,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error saving participant', details: err });
  }
});

app.get('/participants', async (req, res) => {
  try {
    const participants = await Participant.find();
    res.status(200).json(participants);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching participants', details: err });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
