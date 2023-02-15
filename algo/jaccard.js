function jaccardSimilarity(text1, text2) {
  const set1 = new Set(text1.split(" "));
  const set2 = new Set(text2.split(" "));
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  const similarity = intersection.size / union.size;
  const percentage = similarity * 100;
  return percentage;
}

module.exports = jaccardSimilarity;
