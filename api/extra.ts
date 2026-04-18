import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './utils/db';
import Extra from './models/Extra';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 31;
      const query = Extra.find({}).sort({ date: -1 });
      if (limit > 0) query.limit(limit);
      const extras = await query;
      return res.status(200).json(extras);
    } catch (error: any) {
      console.error('[GET Extra] Error:', error);
      return res.status(500).json({ error: error.message || 'Error fetching extra' });
    }
  }

  if (req.method === 'POST') {
    const { date, type, v1, v3 } = req.body;
    try {
      let extra = await Extra.findOne({ date });
      if (!extra) {
        extra = new Extra({ date });
      }
      (extra as any)[`${type}_1`] = v1;
      (extra as any)[`${type}_3`] = v3;
      await extra.save();
      return res.status(200).json(extra);
    } catch (error: any) {
      console.error('[POST Extra] Error:', error);
      return res.status(500).json({ error: error.message || 'Error updating extra' });
    }
  }

  return res.status(405).end();
}
