import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../Config/serverConfig.js';
export const generateJwtToken = (payload) => {
    return jwt.sign(payload,JWT_SECRET, { expiresIn: '1d' });
}
export const verifyJwtToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}