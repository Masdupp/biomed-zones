// Copy generated documentation (model card, data report, figures) into public/docs so the
// Model and Data pages can render it, online or offline.
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const docs = resolve(import.meta.dirname, '../../../docs');
const out = resolve(import.meta.dirname, '../public/docs');
mkdirSync(resolve(out, 'model'), { recursive: true });
for (const f of ['MODEL_CARD.md', 'DATA_REPORT.md']) {
  if (existsSync(resolve(docs, f))) cpSync(resolve(docs, f), resolve(out, f));
}
if (existsSync(resolve(docs, 'model'))) {
  for (const f of readdirSync(resolve(docs, 'model')))
    cpSync(resolve(docs, 'model', f), resolve(out, 'model', f));
}
console.log('docs copied to public/docs');
