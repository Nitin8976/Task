const User = require('../model/user')
module.exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
};
module.exports.getAll = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting all users' });
  }
};
