import { isValidMonthDay } from '@/lib/utils/isValidMonthDay';

describe('isValidMonthDay', () => {
  describe('invalid month', () => {
    it('rejects month 0', () => expect(isValidMonthDay(0, 1)).toBe(false));
    it('rejects month 13', () => expect(isValidMonthDay(13, 1)).toBe(false));
    it('rejects negative month', () =>
      expect(isValidMonthDay(-1, 1)).toBe(false));
  });

  describe('invalid day', () => {
    it('rejects day 0', () => expect(isValidMonthDay(1, 0)).toBe(false));
    it('rejects negative day', () =>
      expect(isValidMonthDay(1, -1)).toBe(false));
  });

  describe('valid dates', () => {
    it('accepts Jan 31', () => expect(isValidMonthDay(1, 31)).toBe(true));
    it('accepts Dec 31', () => expect(isValidMonthDay(12, 31)).toBe(true));
    it('accepts Feb 29 (leap year allowed)', () =>
      expect(isValidMonthDay(2, 29)).toBe(true));
    it('accepts Feb 28', () => expect(isValidMonthDay(2, 28)).toBe(true));
    it('accepts Apr 30', () => expect(isValidMonthDay(4, 30)).toBe(true));
  });

  describe('day exceeds month maximum', () => {
    it('rejects Jan 32', () => expect(isValidMonthDay(1, 32)).toBe(false));
    it('rejects Feb 30', () => expect(isValidMonthDay(2, 30)).toBe(false));
    it('rejects Apr 31', () => expect(isValidMonthDay(4, 31)).toBe(false));
    it('rejects Jun 31', () => expect(isValidMonthDay(6, 31)).toBe(false));
    it('rejects Sep 31', () => expect(isValidMonthDay(9, 31)).toBe(false));
    it('rejects Nov 31', () => expect(isValidMonthDay(11, 31)).toBe(false));
  });
});
