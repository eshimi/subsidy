import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseContact, buildRawMessage } from '../src/contact.js';

test('buildRawMessage: Reply-To と UTF-8 の本文を含む', () => {
  const raw = buildRawMessage({ from: 'noreply@hojyokin.net', to: 'a@example.com', name: '山田', email: 'b@example.com', category: 'その他', message: '本文' });
  assert.match(raw, /Reply-To: b@example\.com/);
  assert.match(raw, /Content-Type: text\/plain; charset=UTF-8/);
  const body = raw.split('\r\n\r\n')[1].replace(/\r\n/g, '');
  assert.match(Buffer.from(body, 'base64').toString('utf8'), /本文/);
});

test('parseContact: 改行入りのメールアドレスは拒否する', () => {
  assert.throws(() => parseContact({ email: 'a@example.com\nBcc: x@example.com', category: 'その他', message: 'x' }));
});
