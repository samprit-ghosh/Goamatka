import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: 'Invalid password' });
    }
  }
  
  if (req.method === 'GET') {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: 'No token' });
      
      const token = authHeader.split(' ')[1];
      try {
          jwt.verify(token, JWT_SECRET);
          return res.status(200).json({ authenticated: true });
      } catch (err) {
          return res.status(401).json({ authenticated: false });
      }
  }

  return res.status(405).end();
}
