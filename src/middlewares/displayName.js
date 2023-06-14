/**
 * 
 * @param {Request} req 
 * @param {Response} res 
*/
module.exports = (req, res, next) => {
  try {
    const { displayName } = req.body;
    if (displayName.length < 8 || !displayName) {
      return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};