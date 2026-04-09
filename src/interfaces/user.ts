import { HydratedDocument } from 'mongoose';

export interface User {
  discord_id: string;
  discord_username: string;
  points: number;
}

export type UserDocument = HydratedDocument<User>;
