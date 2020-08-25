import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const authentication = async (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header === 'undefined') {
    res.status(401).json({
      status: 401,
      message: 'Check your header and put in the token',
    });
  } else {
    await jwt.verify(header, process.env.KEY, (err, payload) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          message: 'The token inserted is not right',
        });
      }
      next();
    });
  }
};

export default authentication;
