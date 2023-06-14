const jwt = require('jsonwebtoken');
const userServices = require('../services/user.service');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const getAllUsers = async (_req, res) => {
  try {
    const users = await userServices.getAll();

    const responseUsers = users.map((user) => ({
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      image: user.image,
    }));

    return res.status(200).json(responseUsers);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const userById = await userServices.getById(id);

    if (!userById) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const user = {
      id: userById.id,
      displayName: userById.displayName,
      email: userById.email,
      image: userById.image,
    };

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

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
  getAllUsers,
  getById,
};