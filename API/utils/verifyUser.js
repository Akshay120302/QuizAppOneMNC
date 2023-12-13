import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  console.log('Token:', token);

  if (!token) return next(errorHandler(401, 'Unauthorized (verifyUser.js)'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return next(errorHandler(403, 'Forbidden'));
    }

    req.user = user;
    next();
  });
};