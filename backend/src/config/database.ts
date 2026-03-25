import mongoose from 'mongoose';
import { env } from './env';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('[db] Connected to MongoDB');
  } catch (err) {
    console.error('[db] Connection failed:', err);
    throw err;
  }
};
