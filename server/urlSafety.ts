import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';


export interface UrlCheck {
  safe: boolean;
  reason?: string;
  parsed?: URL;
}

function isPrivateIPv4(ip: string): boolean {
  const [a, b] = ip.split('.').map((n) => parseInt(n, 10));
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  );
}

function isPrivateIPv6(ip: string): boolean {
  const h = ip.toLowerCase().replace(/^\[|\]$/g, '');
  if (h === '::' || h === '::1') return true;
  const dotted = h.match(/^::(?:ffff:)?(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (dotted) return isPrivateIPv4(dotted[1]);
  const hex = h.match(/^::(?:ffff:)?([0-9a-f]{1,4}):([0-9a-f]{1,4})$/);
  if (hex) {
    const hi = parseInt(hex[1], 16);
    const lo = parseInt(hex[2], 16);
    return isPrivateIPv4(`${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`);
  }
  if (/^f[cd][0-9a-f]{2}:/.test(h)) return true;
  if (/^fe[89ab][0-9a-f]:/.test(h)) return true;
  return false;
}

function isPrivateAddress(ip: string): boolean {
  const family = isIP(ip.replace(/^\[|\]$/g, ''));
  if (family === 4) return isPrivateIPv4(ip);
  if (family === 6) return isPrivateIPv6(ip);
  return false;
}

export function isSafeUrl(rawUrl: string): UrlCheck {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { safe: false, reason: 'Only HTTP and HTTPS protocols are allowed.' };
    }
    if (parsed.username || parsed.password) {
      return { safe: false, reason: 'URLs with embedded credentials are not allowed.' };
    }
    const hostname = parsed.hostname.toLowerCase();
    if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
      return { safe: false, reason: 'Access to localhost and internal addresses is forbidden.' };
    }
    if (isPrivateAddress(hostname)) {
      return { safe: false, reason: 'Private, loopback, and link-local addresses are forbidden.' };
    }
    return { safe: true, parsed };
  } catch {
    return { safe: false, reason: 'Invalid URL format.' };
  }
}

export async function assertSafeUrl(rawUrl: string): Promise<UrlCheck> {
  const basic = isSafeUrl(rawUrl);
  if (!basic.safe || !basic.parsed) return basic;
  const host = basic.parsed.hostname.replace(/^\[|\]$/g, '');
  if (isIP(host)) return basic;
  try {
    const addrs = await lookup(host, { all: true });
    if (addrs.length === 0 || addrs.some((a) => isPrivateAddress(a.address))) {
      return { safe: false, reason: 'Hostname resolves to a private or internal address.' };
    }
  } catch {
    return { safe: false, reason: 'Hostname could not be resolved.' };
  }
  return basic;
}

export async function safeFetch(rawUrl: string, init: RequestInit = {}): Promise<Response> {
  let current = rawUrl;
  for (let hop = 0; hop <= 4; hop++) {
    const check = await assertSafeUrl(current);
    if (!check.safe || !check.parsed) throw new Error(check.reason || 'URL blocked by security guardrails.');
    const resp = await fetch(check.parsed.toString(), { ...init, redirect: 'manual' });
    if (resp.status >= 300 && resp.status < 400 && resp.headers.get('location')) {
      current = new URL(resp.headers.get('location') as string, check.parsed).toString();
      continue;
    }
    return resp;
  }
  throw new Error('Too many redirects.');
}
