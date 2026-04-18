import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import authHandler from './api/auth';
import resultsHandler from './api/results';
import extraHandler from './api/extra';
import marqueeHandler from './api/marquee';
import cleanupHandler from './api/cleanup';

const app = express();
app.use(cors());
app.use(express.json());

// Improved Vercel-to-Express wrapper
const vercelToExpress = (handler: any) => async (req: any, res: any) => {
  // Vercel handlers expect res.status().json() or res.send()
  // Express already has these, but let's ensure compatibility
  const oldJson = res.json.bind(res);
  res.json = (data: any) => {
    return oldJson(data);
  };

  const oldStatus = res.status.bind(res);
  res.status = (code: number) => {
    return oldStatus(code);
  };

  try {
    await handler(req, res);
  } catch (err) {
    console.error('Handler Error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

app.all('/auth', vercelToExpress(authHandler));
app.all('/results', vercelToExpress(resultsHandler));
app.all('/extra', vercelToExpress(extraHandler));
app.all('/marquee', vercelToExpress(marqueeHandler));
app.all('/cleanup', vercelToExpress(cleanupHandler));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\x1b[32m[API] Local backend running at http://localhost:${PORT}\x1b[0m`);
});
