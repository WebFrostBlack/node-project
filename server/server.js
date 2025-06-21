const express = require('express');
const connectDB = require('./mongodb');
const bcrypt = require('bcrypt');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email or password incorrect' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Email or password incorrect' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

app.post('/api/users/new', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: 'Email already used' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ error: 'Username already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({
      message: 'User successfully created',
      user: {
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (err) {
    console.error('Server error :', err);
    res.status(500).json({ error: 'User creation error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server launched on http://localhost:${PORT}`);
});
