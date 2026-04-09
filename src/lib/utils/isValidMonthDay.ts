const DAYS_IN_MONTH = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Returns true if the month/day combination is calendar-valid.
 * Feb 29 is always accepted regardless of leap year, to support birthday storage.
 * @param month - 1-indexed month (1–12).
 * @param day - Day of the month.
 */
export const isValidMonthDay = (month: number, day: number): boolean => {
  if (month < 1 || month > 12 || day < 1) return false;
  return day <= DAYS_IN_MONTH[month];
};
