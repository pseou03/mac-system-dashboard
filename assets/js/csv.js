// A small CSV reader: quoted commas, escaped quotes, CRLF and embedded newlines.
export function parseCSV(text) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  let closedQuote = false;
  text = text.replace(/^\uFEFF/, '');

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
        closedQuote = true;
      } else {
        value += character;
      }
      continue;
    }
    if (closedQuote && ![',', '\r', '\n'].includes(character)) {
      throw new Error('Unexpected text after a quoted CSV field.');
    }
    if (character === '"') {
      if (value) throw new Error('Quote inside an unquoted CSV field.');
      quoted = true;
    } else if (character === ',' || character === '\n' || character === '\r') {
      row.push(value);
      value = '';
      closedQuote = false;
      if (character !== ',') {
        if (row.some(field => field !== '')) rows.push(row);
        row = [];
        if (character === '\r' && text[index + 1] === '\n') index += 1;
      }
    } else {
      value += character;
    }
  }
  if (quoted) throw new Error('Unclosed quoted CSV field.');
  if (value || row.length || closedQuote) {
    row.push(value);
    rows.push(row);
  }
  return rows;
}

export const columns = ['collected_at', 'pid', 'ppid', 'cpu_percent', 'memory_percent', 'elapsed', 'user', 'command'];

export function parseProcesses(text) {
  const [header, ...rows] = parseCSV(text);
  if (!header || header.join(',') !== columns.join(',')) {
    throw new Error('CSV header does not match the process data format.');
  }
  if (rows.length > 20) throw new Error('Expected at most 20 process records.');
  return rows.map((row, index) => {
    if (row.length !== columns.length) throw new Error(`CSV row ${index + 2} has the wrong number of fields.`);
    const process = Object.fromEntries(columns.map((column, position) => [column, row[position]]));
    for (const field of ['pid', 'ppid', 'cpu_percent', 'memory_percent']) {
      const number = Number(process[field]);
      if (!process[field].trim() || !Number.isFinite(number) || number < 0) {
        throw new Error(`Invalid ${field} in CSV row ${index + 2}.`);
      }
      if (['pid', 'ppid'].includes(field) && !Number.isSafeInteger(number)) {
        throw new Error(`Invalid integer ${field} in CSV row ${index + 2}.`);
      }
      process[field] = number;
    }
    if (!process.collected_at || !process.command) throw new Error(`Missing timestamp or command in CSV row ${index + 2}.`);
    return process;
  });
}
