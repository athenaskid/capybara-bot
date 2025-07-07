export const isValidMonthDay = (month: number, day: number) => {
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;

  const daysInMonth: Record<number, number> = {
    1: 31,
    2: 29,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  return day <= daysInMonth[month];
};
