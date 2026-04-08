import { Birthday, BirthdayDocument } from '@/interfaces/birthday';
import { BirthdayModel } from '@/models/birthday';

export const createBirthday = async (
  payload: Pick<Birthday, 'discord_id' | 'birth_month' | 'birth_date' | 'timezone'>,
): Promise<BirthdayDocument> => {
  const now = new Date();
  return await BirthdayModel.create({ ...payload, created_at: now, updated_at: now });
};

export const deleteBirthday = async (
  discord_id: string,
): Promise<BirthdayDocument | null> => {
  return await BirthdayModel.findOneAndDelete({ discord_id });
};

export const getBirthday = async (
  discord_id: string,
): Promise<BirthdayDocument | null> => {
  return await BirthdayModel.findOne({ discord_id });
};

export const getBirthdays = async (
  month: number,
  date: number,
  timezone: string,
): Promise<BirthdayDocument[]> => {
  return await BirthdayModel.find({ birth_month: month, birth_date: date, timezone });
};

export const updateBirthday = async (
  discord_id: string,
  data: Partial<Birthday>,
): Promise<BirthdayDocument | null> => {
  const now = new Date();
  return await BirthdayModel.findOneAndUpdate(
    { discord_id },
    { ...data, updated_at: now },
    { new: true },
  );
};
