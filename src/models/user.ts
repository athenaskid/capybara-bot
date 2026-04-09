import { model, models, Schema } from 'mongoose';

import { User } from '@/interfaces/user';
import { env } from '@/lib/configs';

const userSchema = new Schema<User>(
  {
    discord_id: { type: String, required: true, unique: true },
    discord_username: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
  },
  { collection: env.MONGODB_USERS, versionKey: false },
);

export const UserModel = models.User || model<User>('User', userSchema);
