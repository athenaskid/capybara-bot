const required = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.error(`Error: Missing environment variable "${key}"`);
    process.exit(1);
  }
  return value;
};

export const env = {
  MONGODB_URL: required('MONGODB_URL'),
  MONGODB_CLUSTER: required('MONGODB_CLUSTER'),
  MONGODB_DB: required('MONGODB_DB'),
  MONGODB_DB_TEST: process.env.MONGODB_DB_TEST,
  MONGODB_BIRTHDAYS: required('MONGODB_BIRTHDAYS'),
  MONGODB_USERS: required('MONGODB_USERS'),
  TOKEN: required('TOKEN'),
  CLIENT_ID: required('CLIENT_ID'),
  SERVER_ID: required('SERVER_ID'),
  STAGING: Boolean(process.env.STAGING),
  REGISTER: Boolean(process.env.REGISTER),
};
