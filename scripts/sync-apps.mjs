import { promises as fs } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

const source = join(root, 'data', 'apps.json');
const targetDir = join(root, 'public', 'data');
const target = join(targetDir, 'apps.json');

async function syncApps() {
  try {
    await fs.mkdir(targetDir, { recursive: true });
    const content = await fs.readFile(source);
    await fs.writeFile(target, content);
    console.log(`Synced ${source} → ${target}`);
  } catch (error) {
    console.error('Failed to sync apps.json', error);
    process.exitCode = 1;
  }
}

syncApps();
