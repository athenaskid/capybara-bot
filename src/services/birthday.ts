import { BirthdayDocument } from '@/interfaces/birthday';
import { BirthdayModel } from '@/models/birthday';

/**
 * createBirthday
 */
export const createBirthday = async ({
  discord_id,
  birth_month,
  birth_date,
  timezone,
}: Partial<BirthdayDocument>): Promise<BirthdayDocument> => {
  const now = new Date();

  const data: Partial<BirthdayDocument> = {
    discord_id,
    birth_month,
    birth_date,
    timezone,
    created_at: now,
    updated_at: now,
  };

  return await BirthdayModel.create(data);
};

/**
 * deleteBirthday
 */
export const deleteBirthday = async (
  discord_id: string
): Promise<BirthdayDocument | null> => {
  return await BirthdayModel.findOneAndDelete({ discord_id });
};

/**
 * getBirthday
 */
export const getBirthday = async (
  discord_id: string
): Promise<BirthdayDocument | null> => {
  return await BirthdayModel.findOne({ discord_id });
};

/**
 * getBirthdays
 */
export const getBirthdays = async (
  month: number,
  date: number,
  timezone: string
): Promise<BirthdayDocument[] | null> => {
  return await BirthdayModel.find({
    birth_month: month,
    birth_date: date,
    timezone,
  });
};

/**
 * updateBirthday
 */
export const updateBirthday = async (
  discord_id: string,
  data: Partial<BirthdayDocument>
): Promise<BirthdayDocument | null> => {
  const now = new Date();

  return await BirthdayModel.findOneAndUpdate(
    { discord_id },
    { ...data, updated_at: now },
    { new: true }
  );
};
