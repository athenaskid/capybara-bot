import { User, UserDocument } from '@/interfaces/user';
import { UserModel } from '@/models/user';

export const createUser = async (
  payload: Partial<User>,
): Promise<UserDocument> => {
  const user = new UserModel(payload);
  return user.save();
};

export const deleteUser = async (
  discord_id: string,
): Promise<UserDocument | null> => {
  return await UserModel.findOneAndDelete({ discord_id });
};

export const findOrCreateUser = async (
  discord_id: string,
  discord_username: string,
): Promise<UserDocument> => {
  const user = await getUser(discord_id);
  if (user) return user;

  return createUser({ discord_id, discord_username });
};

export const getUser = async (
  discord_id: string,
): Promise<UserDocument | null> => {
  return await UserModel.findOne({ discord_id });
};

export const getTopUsers = async (limit: number): Promise<UserDocument[]> => {
  return await UserModel.find().sort({ points: -1 }).limit(limit);
};

export const updateUser = async (
  user: Partial<User>,
): Promise<UserDocument | null> => {
  return await UserModel.findOneAndUpdate(
    { discord_id: user.discord_id },
    {
      $inc: { points: user.points },
      $setOnInsert: {
        discord_username: user.discord_username,
      },
    },
    { returnDocument: 'after', upsert: true },
  );
};
