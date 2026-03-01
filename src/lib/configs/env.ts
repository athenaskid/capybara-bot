const MONGODB_BIRTHDAYS = process.env.MONGODB_BIRTHDAYS;
const MONGODB_USERS = process.env.MONGODB_USERS;
const SERVER_ID = process.env.SERVER_ID;

export const getENV = () => {
  if (!MONGODB_BIRTHDAYS || !MONGODB_USERS || !SERVER_ID) {
    console.error('Error: Missing Environment Variables');
    process.exit(1);
  }

  return {
    MONGODB_BIRTHDAYS,
    MONGODB_USERS,
    SERVER_ID,
  };
};
