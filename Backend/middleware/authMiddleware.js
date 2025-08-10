import { verifyToken as verifyJwtToken } from '../config/jwt.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyJwtToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const verifyEmployer = (req, res, next) => {
  if (req.user.role !== 'employer') return res.status(403).json({ message: 'Access denied' });
  next();
};

export const verifyJobSeeker = (req, res, next) => {
  if (req.user.role !== 'jobseeker') return res.status(403).json({ message: 'Access denied' });
  next();
};
