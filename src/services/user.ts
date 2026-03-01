import { UserDocument } from '@/interfaces/user';
import { UserModel } from '@/models/user';

/**
 * createUser
 */
export const createUser = async (
  payload: UserDocument,
): Promise<UserDocument> => {
  const user = new UserModel(payload);
  return user.save();
};

/**
 * deleteUser
 */
export const deleteUser = async (
  discord_id: string,
): Promise<UserDocument | null> => {
  return await UserModel.findOneAndDelete({ discord_id });
};

/**
 * getUser
 */
export const getUser = async (
  discord_id: string,
): Promise<UserDocument | null> => {
  return await UserModel.findOne({ discord_id });
};

/**
 * updateUser
 */
export const updateUser = async (
  user: Partial<UserDocument>,
): Promise<UserDocument | null> => {
  return await UserModel.findOneAndUpdate(
    { discord_id: user.discord_id },
    {
      $inc: { points: user.points },
      $setOnInsert: {
        discord_username: user.discord_username,
      },
    },
    { new: true, upsert: true },
  );
};
