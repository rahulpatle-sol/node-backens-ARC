import jwt from 'jsonwebtoken';

// Protected route middleware
// Header: Authorization: Bearer <token>

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const err = new Error('Not authorized, no token');
      err.status = 401;
      return next(err);
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded payload ko req pe attach kar do ({id, email, iat, exp})
    req.user = decoded;

    next();
  } catch (err) {
    err.status = 401;
    err.message = 'Not authorized, token failed';
    next(err);
  }
};

export default protect;
