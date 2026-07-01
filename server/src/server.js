import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { initializeAnalyticsIndexes } from './utils/initializeIndexes.js';

connectDatabase()
  .then(async () => {
    await initializeAnalyticsIndexes();
    app.listen(env.port, () => console.log(`API listening on port ${env.port}`));
  })
  .catch((error) => { console.error('Startup failed:', error.message); process.exit(1); });
