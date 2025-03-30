const { createUser, checkAuthUser } = require('../services/userService');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password, profilePermission } = req.body;

  try {
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      const { newUser, token } = await createUser({ username, email, password, profilePermission: 'admin' }, null);
      return res.status(201).json({
        message: 'First user created successfully as admin',
        token,
        user: {
          username: newUser.username,
          email: newUser.email,
          profilePermission: newUser.profilePermission,
        },
      });
    }

    let authenticatedUser;
    try {
      authenticatedUser = await checkAuthUser(req);
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }

    if (authenticatedUser.profilePermission !== 'admin') {
      return res.status(403).json({ message: 'Permission denied. Only admins can create new users.' });
    }

    const { newUser, token } = await createUser({ username, email, password, profilePermission }, authenticatedUser);
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        username: newUser.username,
        email: newUser.email,
        profilePermission: newUser.profilePermission,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = jwt.sign(
        { id: user._id, profilePermission: user.profilePermission }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profilePermission: user.profilePermission
        }
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}



module.exports = { registerUser, loginUser };
