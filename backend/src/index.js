import { PORT } from './config.js';
import app from './app.js';
import { syncAll } from './models/index.js';

await syncAll();

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
