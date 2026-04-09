/**
 * Selects a key at random, weighted by its value.
 * Returns `null` if the random value exceeds the total sum of all weights.
 * @param weights - Map of key → probability weight. Weights should sum to 1 for guaranteed selection.
 */
export const weightedRandom = (weights: Record<string, number>): string | null => {
  const r = Math.random();
  let sum = 0;

  for (const [key, weight] of Object.entries(weights)) {
    sum += weight;
    if (r <= sum) return key;
  }

  return null;
};
