const Users = require('../models/usersModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await Users.findOne({ username });

    if (usernameCheck) {
      return res.json({ msg: 'Username already exists.', status: 401 });
    }

    const emailCheck = await Users.findOne({ email });

    if (emailCheck) {
      return res.json({ msg: 'E-mail already exitst.', status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    delete newUser.password;

    return res.json({ newUser, status: 201 });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailCheck = await Users.findOne({ email });

    if (!emailCheck) {
      return res.json({ msg: 'Incorrect email.', status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, emailCheck.password);

    if (!isPasswordValid) {
      return res.json({ msg: 'Incorrect password.', status: 401 });
    }

    delete emailCheck.password;

    return res.json({ emailCheck, status: 201 });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await Users.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    },{ new: true});
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);
    return res.json(users)
  } catch (err) {
    console.log(err.message);
  }
};
