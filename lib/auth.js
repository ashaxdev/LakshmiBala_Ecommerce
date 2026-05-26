import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export function getTokenFromRequest(req) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  return cookies.admin_token || cookies.user_token || null;
}

export function requireAdmin(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  req.user = decoded;
  if (next) next();
  return decoded;
}
