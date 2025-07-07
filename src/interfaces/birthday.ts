import { Document } from 'mongoose';

export interface BirthdayDocument extends Document {
  discord_id: string;
  birth_month: number;
  birth_date: number;
  timezone: string;
  created_at: Date;
  updated_at: Date;
}
