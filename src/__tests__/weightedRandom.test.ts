import { weightedRandom } from '@/lib/utils/weightedRandom';

describe('weightedRandom', () => {
  it('returns null for empty weights', () => {
    expect(weightedRandom({})).toBeNull();
  });

  it('always returns the only key when weight is 1', () => {
    expect(weightedRandom({ win: 1 })).toBe('win');
  });

  it('returns null when weights sum to less than 1 and random exceeds sum', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.99);
    expect(weightedRandom({ a: 0.1 })).toBeNull();
    jest.spyOn(Math, 'random').mockRestore();
  });

  it('returns the correct key based on random value', () => {
    // weights: win=0.49, lose=0.51 — total=1.0
    // r=0.3 → hits win (sum=0.49 >= 0.3)
    jest.spyOn(Math, 'random').mockReturnValue(0.3);
    expect(weightedRandom({ win: 0.49, lose: 0.51 })).toBe('win');
    jest.spyOn(Math, 'random').mockRestore();
  });

  it('returns the second key when random exceeds first weight', () => {
    // r=0.6 → skips win (sum=0.49 < 0.6), hits lose (sum=1.0 >= 0.6)
    jest.spyOn(Math, 'random').mockReturnValue(0.6);
    expect(weightedRandom({ win: 0.49, lose: 0.51 })).toBe('lose');
    jest.spyOn(Math, 'random').mockRestore();
  });

  it('returns the first key when random is 0', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    expect(weightedRandom({ a: 0.5, b: 0.5 })).toBe('a');
    jest.spyOn(Math, 'random').mockRestore();
  });
});
