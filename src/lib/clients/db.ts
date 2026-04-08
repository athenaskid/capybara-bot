import mongoose from 'mongoose';

import { env } from '@/lib/configs';

export const connectDatabase = async () => {
  const databaseName = env.STAGING ? (env.MONGODB_DB_TEST ?? env.MONGODB_DB) : env.MONGODB_DB;
  const dbURL = `${env.MONGODB_URL}/${databaseName}?retryWrites=true&w=majority&appName=${env.MONGODB_CLUSTER}`;

  try {
    await mongoose.connect(dbURL);
    console.log('CapybaraBot: Database Connected');
  } catch (error) {
    console.error('Error: ' + error);
    process.exit(1);
  }
};
