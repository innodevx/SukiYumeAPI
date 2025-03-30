const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async ({ username, email, password, profilePermission }, authenticatedUser) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profilePermission: profilePermission || 'user',
  });

  await newUser.save();

  const token = jwt.sign(
    { userId: newUser._id, profilePermission: newUser.profilePermission },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { newUser, token };
};

const checkAuthUser = async (req) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        throw new Error('No token, authorization denied');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = { createUser , checkAuthUser };
