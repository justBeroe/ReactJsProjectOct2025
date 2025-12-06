const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User model
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
});

// POST /register endpoint (no hashing)
app.post('/registerin', async (req, res) => {
  const { username, email, password, rePassword } = req.body;

  if (!username || !email || password !== rePassword) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) return res.status(409).json({ message: 'User already exists' });

  const user = new User({ username, email, password }); // plain text password

  await user.save();
  res.status(201).json({ message: 'User created successfully (not hashed)' });
});

//Login
app.post('/loginin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'User not found' });

  // If not using bcrypt:
  if (user.password !== password) {
    return res.status(401).json({ message: 'Incorrect password' });
  }

  // Optionally exclude password from response
  const userData = {
    id: user._id,
    username: user.username,
    email: user.email
  };

  res.json(userData);
});


//

// Start server
app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
