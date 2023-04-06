const userService = require('../../domain/services/userService');

// Controller methods for user management
async function register(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function login(req, res) {
  try {
    const user = await userService.authenticateUser(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

async function getProfile(req, res) {
  try {
    const user = await userService.getUser(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateProfile(req, res) {
  try {
    const user = await userService.updateUser(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile
};

