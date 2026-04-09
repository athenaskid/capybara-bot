export const weightedRandom = (weights: Record<string, number>): string | null => {
  const r = Math.random();
  let sum = 0;

  for (const [key, weight] of Object.entries(weights)) {
    sum += weight;
    if (r <= sum) return key;
  }

  return null;
};
