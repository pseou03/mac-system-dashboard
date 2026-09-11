import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseCSV, parseProcesses, columns } from '../assets/js/csv.js';
import { loadProcesses } from '../assets/js/app.js';
const sample = await readFile(new URL('../data/process_top20_sample.csv', import.meta.url), 'utf8');

test('CSV handles commas, escaped quotes, CRLF, BOM and multiline fields', () => {
  assert.deepEqual(parseCSV('\uFEFFa,b\r\n"one,two","say ""hi""\nnext"\r\n'), [['a','b'],['one,two','say "hi"\nnext']]);
  assert.throws(() => parseCSV('"broken'), /Unclosed/);
  assert.throws(() => parseCSV('"a"oops'), /Unexpected/);
});
test('process schema converts numbers and rejects corrupt data', () => {
  const rows = parseProcesses(sample);
  assert.equal(rows.length, 8);
  assert.equal(rows[0].cpu_percent, 28.4);
  assert.equal(rows[5].command, 'MediaService "Preview"');
  assert.throws(() => parseProcesses(sample.replace('28.4', 'oops')), /Invalid/);
  assert.throws(() => parseProcesses('wrong,header'), /header/);
  assert.deepEqual(parseProcesses(columns.join(',')), []);
});
test('loads real CSV first, announces fallback, and reports both failures', async () => {
  const real = await loadProcesses(async () => ({ ok: true, text: async () => sample }));
  assert.equal(real.source, 'local');
  let requests = 0;
  const fallback = await loadProcesses(async () => ++requests === 1
    ? { ok: false, status: 404 } : { ok: true, text: async () => sample });
  assert.equal(fallback.source, 'sample');
  assert.match(fallback.message, /404/);
  await assert.rejects(loadProcesses(async () => ({ ok: false, status: 500 })), /Local CSV: HTTP 500. Sample CSV: HTTP 500/);
  const malformed = await loadProcesses(async url => ({ ok: true, text: async () => String(url).endsWith('_sample.csv') ? sample : 'invalid' }));
  assert.equal(malformed.source, 'sample');
  assert.match(malformed.message, /header/);
});
