import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './utils/db';
import Result from './models/Result';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 31;
      const query = Result.find({}).sort({ date: -1 });
      if (limit > 0) query.limit(limit);
      const results = await query;
      return res.status(200).json(results);
    } catch (error: any) {
      console.error('[GET Results] Error:', error);
      return res.status(500).json({ error: error.message || 'Error fetching results' });
    }
  }

  if (req.method === 'POST') {
    const { date, slot, v1, v3 } = req.body;
    console.log('[API] Update result request:', { date, slot, v1, v3 });
    try {
      let result = await Result.findOne({ date });
      if (!result) {
        console.log('[API] Creating new result document for date:', date);
        result = new Result({ date });
      }
      
      const v1Key = `slot_${slot}_1`;
      const v3Key = `slot_${slot}_3`;
      console.log(`[API] Setting keys: ${v1Key}=${v1}, ${v3Key}=${v3}`);
      
      (result as any)[v1Key] = v1;
      (result as any)[v3Key] = v3;
      
      await result.save();
      console.log('[API] Result saved successfully');
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('[POST Result] Error:', error);
      return res.status(500).json({ error: error.message || 'Error updating result' });
    }
  }
  
  if (req.method === 'DELETE') {
      const { date, slot } = req.body;
      try {
          const result = await Result.findOne({ date });
          if (result) {
              (result as any)[`slot_${slot}_1`] = null;
              (result as any)[`slot_${slot}_3`] = null;
              await result.save();
          }
          return res.status(200).json({ success: true });
      } catch (error: any) {
          return res.status(500).json({ error: error.message });
      }
  }

  return res.status(405).end();
}
