import { model, models, Schema } from 'mongoose';

import { Birthday } from '@/interfaces/birthday';
import { getENV } from '@/lib/configs';

const { MONGODB_BIRTHDAYS } = getENV();

const birthdaySchema = new Schema<Birthday>(
  {
    discord_id: { type: String, required: true, unique: true },
    birth_month: { type: Number, required: true },
    birth_date: { type: Number, required: true },
    timezone: { type: String, required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
  },
  { collection: MONGODB_BIRTHDAYS, versionKey: false }
);

export const BirthdayModel = models.Birthday || model<Birthday>('Birthday', birthdaySchema);
