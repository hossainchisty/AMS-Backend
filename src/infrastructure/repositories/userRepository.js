const User = require('../../domain/models/userModel');

// Repository methods for user management
async function create(user) {
  const createdUser = await User.create(user);
  return createdUser;
}

async function findByEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

async function findById(id) {
  const user = await User.findById(id);
  return user;
}

async function update(id, updates) {
  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
  return updatedUser;
}

module.exports = {
  create,
  findByEmail,
  findById,
  update
};
