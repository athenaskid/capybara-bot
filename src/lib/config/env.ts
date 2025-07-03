const MONGODB_BIRTHDAY = process.env.MONGODB_BIRTHDAY;
const SERVER_ID = process.env.SERVER_ID;

export const getENV = () => {
  if (!MONGODB_BIRTHDAY || !SERVER_ID) {
    console.error('Error: Missing Environment Variables');
    process.exit(1);
  }

  return {
    MONGODB_BIRTHDAY,
    SERVER_ID,
  };
};
