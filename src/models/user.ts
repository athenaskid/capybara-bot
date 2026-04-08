import { model, models, Schema } from 'mongoose';

import { User } from '@/interfaces/user';
import { getENV } from '@/lib/configs';

const { MONGODB_USERS } = getENV();

const userSchema = new Schema<User>(
  {
    discord_id: { type: String, required: true, unique: true },
    discord_username: { type: String, required: true },
    points: { type: Number, required: true, default: 0 },
  },
  { collection: MONGODB_USERS, versionKey: false },
);

export const UserModel = models.User || model<User>('User', userSchema);
