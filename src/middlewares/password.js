/**
 * 
 * @param {Request} req 
 * @param {Response} res 
*/
module.exports = (req, res, next) => {
  try {
    const { password } = req.body;

    if (password.length < 6 || !password) {
      return res.status(400)
      .json({ message: '"password" length must be at least 6 characters long' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};