import { config } from "dotenv";
config();
import jwt from 'jsonwebtoken';



export const rolebsed = (role) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  
  if (!authHeader ) {
    return res.status(400).json({ message: 'Token not found or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.jwt_secret);
    
    if (!role.includes(verified.role)) {
      return res.status(401).json({ message: 'Unauthorized...' });
    }

    req.user = verified;
    next();
  } catch (error) {
    console.log(error.message, 'error from role based mw');
    return res.status(401).json({ msg: 'Please Login Again' });
  }
};
