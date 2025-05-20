export const weightedRandom = (toRandomize: Record<string, number>) => {
  let i,
    sum = 0,
    r = Math.random();
  for (i in toRandomize) {
    sum += toRandomize[i];
    if (r <= sum) return i;
  }
  return null;
};
