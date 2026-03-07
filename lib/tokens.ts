import { createHmac, timingSafeEqual } from 'crypto';

function secret() {
  const s = process.env.CANCEL_TOKEN_SECRET;
  if (!s) throw new Error('CANCEL_TOKEN_SECRET is not set');
  return s;
}

export function generateCancelToken(id: string): string {
  return createHmac('sha256', secret()).update(id).digest('hex');
}

export function verifyCancelToken(id: string, token: string): boolean {
  const expected = generateCancelToken(id);
  try {
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(token, 'hex');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
