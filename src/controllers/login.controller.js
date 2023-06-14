const jwt = require('jsonwebtoken');
const userService = require('../services/login.service');

const validateBody = (email, password) => email && password;
const secret = process.env.JWT_SECRET || 'secretJWT';
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
*/
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateBody(email, password)) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await userService.getByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};