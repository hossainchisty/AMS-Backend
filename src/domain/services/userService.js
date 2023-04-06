const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../../infrastructure/repositories/userRepository');

// Service methods for user management
async function createUser(user) {
  // Hash password before storing in database
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  
  // Create new user
  const createdUser = await userRepository.create(user);

  // Generate token
  const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);

  // Return user and token
  return { user: createdUser, token };
}

async function authenticateUser(credentials) {
  // Find user by email
  const user = await userRepository.findByEmail(credentials.email);

  // Check if user exists
  if (!user) {
    throw new Error('User not found');
  }

  // Check if password is correct
  const passwordMatches = await bcrypt.compare(credentials.password, user.password);
  if (!passwordMatches) {
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // Return user and token
  return { user, token };
}

async function getUser(id) {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

async function updateUser(id, updates) {
  const updatedUser = await userRepository.update(id, updates);
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
}

module.exports = {
  createUser,
  authenticateUser,
  getUser,
  updateUser
};

