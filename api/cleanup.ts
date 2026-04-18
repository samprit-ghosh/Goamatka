import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from './utils/db';
import Result from './models/Result';
import Extra from './models/Extra';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      // Existing records don't have createdAt. We can delete them if they are old.
      // For simplicity, let's also delete anything where createdAt is missing (as they are 'legacy') 
      // OR older than 6 months.
      
      const resResults = await Result.deleteMany({
        $or: [
          { createdAt: { $lt: sixMonthsAgo } },
          { createdAt: { $exists: false } } // Treat missing as old for now, or we could parse 'date'
        ]
      });

      const resExtras = await Extra.deleteMany({
        $or: [
          { createdAt: { $lt: sixMonthsAgo } },
          { createdAt: { $exists: false } }
        ]
      });

      return res.status(200).json({
        success: true,
        message: 'Old data deleted successfully',
        deletedResults: resResults.deletedCount,
        deletedExtras: resExtras.deletedCount
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).end();
}
