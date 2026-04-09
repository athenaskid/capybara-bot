const DAYS_IN_MONTH = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const isValidMonthDay = (month: number, day: number): boolean => {
  if (month < 1 || month > 12 || day < 1) return false;
  return day <= DAYS_IN_MONTH[month];
};
