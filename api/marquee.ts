import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './utils/db';
import MarqueeText from './models/MarqueeText';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const texts = await MarqueeText.find({});
      return res.status(200).json(texts);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    const { text, is_active, id } = req.body;
    try {
      if (id) {
        const updated = await MarqueeText.findByIdAndUpdate(id, { text, is_active }, { new: true });
        return res.status(200).json(updated);
      } else {
        const newItem = new MarqueeText({ text, is_active });
        await newItem.save();
        return res.status(201).json(newItem);
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await MarqueeText.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).end();
}
