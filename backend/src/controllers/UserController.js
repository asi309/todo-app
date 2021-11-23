const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');

module.exports = {
  async createUser(req, res) {
    try {
      const { firstName, lastName, password, email } = req.body;

      if (!firstName || !lastName || !password || !email) {
        return res.status(200).json({
          message: 'Required field missing',
        });
      }

      if (
        (firstName.match(/[^a-zA-Z]+/g) || lastName.match(/[^a-zA-Z]/g)) !==
        null
      ) {
        return res.status(200).json({
          message:
            'Enter names correctly. Names cannot contain special characters',
        });
      }

      const existing_user = await User.findOne({ email });

      if (!existing_user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });

        const userResponse = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        return jwt.sign(
          { user: userResponse },
          process.env.SECRET,
          (error, token) =>
            res.json({
              user: token,
              user_id: userResponse._id,
            })
        );
      }

      return res.status(200).json({
        message: 'Email already in use',
      });
    } catch (error) {
      throw Error(`Error while registering user - ${error}`);
    }
  },

  async getUserById(req, res) {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);

      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: 'User id doesnot exist',
      });
    }
  },
};
