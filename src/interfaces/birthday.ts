import { HydratedDocument } from 'mongoose';

export interface Birthday {
  discord_id: string;
  birth_month: number;
  birth_date: number;
  timezone: string;
  created_at: Date;
  updated_at: Date;
}

export type BirthdayDocument = HydratedDocument<Birthday>;
