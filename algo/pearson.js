function pearsonCorrelation(text1, text2) {
  const vec1 = getFrequencyVector(text1);
  const vec2 = getFrequencyVector(text2);
  const tokens = Object.keys(vec1);
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;
  let n = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (vec2[token]) {
      sumX += vec1[token];
      sumY += vec2[token];
      sumXY += vec1[token] * vec2[token];
      sumX2 += vec1[token] ** 2;
      sumY2 += vec2[token] ** 2;
      n++;
    }
  }
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2)
  );
  const correlation = numerator / denominator;
  const percentage = ((1 + correlation) / 2) * 100;
  return percentage;
}

function getFrequencyVector(text) {
  const tokens = text.split(" ");
  const freq = {};
  tokens.forEach((token) => {
    freq[token] = freq[token] ? freq[token] + 1 : 1;
  });
  return freq;
}

module.exports = pearsonCorrelation;
