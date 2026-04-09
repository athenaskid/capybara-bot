import { getCurrency } from '@/lib/utils/getCurrency';

describe('getCurrency', () => {
  it('returns singular for 1', () => expect(getCurrency(1)).toBe('point'));
  it('returns plural for 0', () => expect(getCurrency(0)).toBe('points'));
  it('returns plural for 2', () => expect(getCurrency(2)).toBe('points'));
  it('returns plural for large values', () =>
    expect(getCurrency(1000)).toBe('points'));
  it('returns plural for negative values', () =>
    expect(getCurrency(-1)).toBe('points'));
});
