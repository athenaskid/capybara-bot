import { CONFIG } from '@/constants';

export const getCurrency = (value: number): string => {
  return value === 1 ? CONFIG.CURRENCY.SINGLE : CONFIG.CURRENCY.PLURAL;
};
