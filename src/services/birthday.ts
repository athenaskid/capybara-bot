import { BirthdayDocument } from '@/interfaces/birthday';
import { BirthdayModel } from '@/models/birthday';

export const birthdayService = {
  /**
   * createBirthday
   */
  createBirthday: async ({
    discord_id,
    birth_month,
    birth_date,
    timezone,
  }: Partial<BirthdayDocument>): Promise<BirthdayDocument> => {
    const data: Partial<BirthdayDocument> = {
      discord_id,
      birth_month,
      birth_date,
      timezone,
    };

    return await BirthdayModel.create(data);
  },

  /**
   * deleteBirthday
   */
  deleteBirthday: async (
    discord_id: string
  ): Promise<BirthdayDocument | null> => {
    return await BirthdayModel.findOneAndDelete({ discord_id });
  },

  /**
   * updateBirthday
   */
  updateBirthday: async (
    discord_id: string,
    data: Partial<BirthdayDocument>
  ): Promise<BirthdayDocument | null> => {
    const now = new Date();
    return await BirthdayModel.findOneAndUpdate(
      { discord_id },
      { ...data, updated_at: now },
      { new: true }
    );
  },
};
