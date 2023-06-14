/**
 * 
 * @param {Request} req 
 * @param {Response} res 
*/
module.exports = (req, res, next) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      return res.status(400)
      .json({ message: '"email" must be a valid email' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};