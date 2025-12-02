import { Sequelize } from 'sequelize';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allow overriding storage via env var for Vercel or other platforms.
// On Vercel, prefer the system temp directory since the project filesystem is read-only.
const storagePath = process.env.SQLITE_STORAGE
  || (process.env.VERCEL ? path.join(os.tmpdir(), 'database.sqlite') : path.join(__dirname, '..', 'database.sqlite'));

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath,
  logging: false,
});
