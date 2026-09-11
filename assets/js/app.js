import { parseProcesses } from './csv.js';

// URLs are relative to this module, so root and nested HTML pages both work.
const realURL = new URL('../../data/process_top20.csv', import.meta.url);
const sampleURL = new URL('../../data/process_top20_sample.csv', import.meta.url);

export async function loadProcesses(fetcher = fetch) {
  async function read(url) {
    const response = await fetcher(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return parseProcesses(await response.text());
  }
  try {
    return { records: await read(realURL), source: 'local', message: 'Local process snapshot loaded.' };
  } catch (realError) {
    try {
      return {
        records: await read(sampleURL), source: 'sample',
        message: `Sample data — local snapshot unavailable (${realError.message}). Run the collector in Terminal to use this Mac’s data.`
      };
    } catch (sampleError) {
      throw new Error(`Local CSV: ${realError.message}. Sample CSV: ${sampleError.message}. Start the HTTP server and check the data files.`);
    }
  }
}

export function renderTable(records, body) {
  body.replaceChildren();
  for (const process of records) {
    const row = document.createElement('tr');
    for (const field of ['pid', 'ppid', 'command', 'cpu_percent', 'memory_percent', 'elapsed', 'user']) {
      const cell = document.createElement('td');
      // textContent keeps command names as text, never executable HTML.
      cell.textContent = process[field];
      row.append(cell);
    }
    body.append(row);
  }
  if (!records.length) {
    const row = body.insertRow();
    const cell = row.insertCell();
    cell.colSpan = 7;
    cell.textContent = 'No processes to display.';
  }
}

function renderSummary(records) {
  const set = (id, value) => { const element = document.getElementById(id); if (element) element.textContent = value; };
  set('metric-count', records.length);
  for (const [name, field] of [['cpu', 'cpu_percent'], ['memory', 'memory_percent']]) {
    const values = records.map(record => record[field]);
    set(`metric-${name}-max`, records.length ? Math.max(...values).toFixed(1) + '%' : '—');
    set(`metric-${name}-average`, records.length ? (values.reduce((sum, value) => sum + value, 0) / records.length).toFixed(1) + '%' : '—');
  }
  set('last-updated', records[0]?.collected_at ?? '—');
  set('visible-count', `${records.length} collected processes`);
}

async function start() {
  const status = document.querySelector('#data-status');
  const body = document.querySelector('#process-rows');
  if (!status || !body) return;
  status.textContent = 'Loading process data…';
  const reload = document.querySelector('#reload-data');
  if (reload) reload.disabled = true;
  try {
    const data = await loadProcesses();
    status.textContent = data.message;
    status.dataset.source = data.source;
    renderTable(data.records, body);
    renderSummary(data.records);
  } catch (error) {
    status.textContent = error.message;
    status.dataset.source = 'error';
    renderTable([], body);
    renderSummary([]);
  } finally {
    if (reload) reload.disabled = false;
  }
}

if (typeof document !== 'undefined') {
  document.querySelector('#reload-data')?.addEventListener('click', start);
  start();
}
