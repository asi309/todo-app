const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/Users');

module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(200).json({
          message: 'Required field missing',
        });
      }

      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(200).json({
          message: 'User doesnot exist',
        });
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const userResponse = {
          _id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
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
      } else {
        return res.status(200).json({
          message:
            'Email or password doesnot match. Do you want to register instead?',
        });
      }
    } catch (error) {
      throw Error(`Error while authenticating user - ${error}`);
    }
  },
};
