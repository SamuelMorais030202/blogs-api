const jwt = require('jsonwebtoken');
const userServices = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'secretJWT';
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
*/
const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const ValidateExistUser = await userServices.getByEmail(email);
    if (ValidateExistUser !== null) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const newUser = await userServices.createUser({ displayName, email, password, image });

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { userId: newUser.id } }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
};