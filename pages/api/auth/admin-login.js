import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import { signToken } from '../../../lib/auth';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  await dbConnect();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    // Auto-create admin if none exists
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@sivakaasifashion.com';
      if (email.toLowerCase() !== adminEmail) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      user = await User.create({
        name: 'Admin', email: adminEmail, password: password, role: 'admin',
      });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
    if (user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });

    const token = signToken({ id: user._id, email: user.email, role: 'admin', name: user.name });
    res.setHeader('Set-Cookie', serialize('admin_token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', maxAge: 7 * 24 * 60 * 60, path: '/',
    }));
    return res.status(200).json({ message: 'Login successful', name: user.name });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
