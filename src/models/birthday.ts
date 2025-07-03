import { model, Schema } from 'mongoose';

import { BirthdayDocument } from '@/interfaces/birthday';
import { getENV } from '@/lib/configs';

const { MONGODB_BIRTHDAYS } = getENV();

const birthdaySchema = new Schema<BirthdayDocument>(
  {
    discord_id: { type: String, required: true },
    birth_month: { type: Number, required: true },
    birth_date: { type: Number, required: true },
    timezone: { type: String, required: true },
  },
  { collection: MONGODB_BIRTHDAYS, versionKey: false }
);

export const BirthdayModel = model<BirthdayDocument>(
  'Birthday',
  birthdaySchema
);
