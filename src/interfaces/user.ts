import { Document } from 'mongoose';

export interface UserDocument extends Document {
  discord_id: string;
  discord_username: string;
  points: number;
}
