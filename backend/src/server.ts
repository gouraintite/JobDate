import { env } from './config/env';
import { connectDatabase } from './config/database';
import app from './app';

const start = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`[server] Running on port ${env.port} (${env.nodeEnv})`);
  });
};

start().catch((err) => {
  console.error('[server] Failed to start:', err);
  process.exit(1);
});
