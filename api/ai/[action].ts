import type { IncomingMessage, ServerResponse } from 'http';
import { runAi } from '../../server/ai.js';

// Vercel function for /api/ai/<action>. The site itself is served from GitHub Pages,
// so the browser calls this cross-origin; only the Pages site (and this deployment) may.

const ALLOWED_ORIGINS = ['https://tharunhellotelugu-star.github.io'];
const MAX_BODY_CHARS = 20_000;

type Req = IncomingMessage & { body?: unknown; query: Record<string, string | string[]> };

function send(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export default async function handler(req: Req, res: ServerResponse) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Vary', 'Origin');
  }
  if (req.method === 'OPTIONS') return void res.end();
  if (req.method !== 'POST') return send(res, 405, { error: 'Use POST' });

  if (JSON.stringify(req.body ?? {}).length > MAX_BODY_CHARS) {
    return send(res, 413, { error: 'Text is too long for the AI helpers' });
  }

  const action = String(req.query.action);
  const result = await runAi(action, req.body);
  if (result === null) return send(res, 404, { error: 'Unknown AI action' });
  send(res, 200, result);
}
