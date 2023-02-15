function euclideanDistance(text1, text2) {
  const vec1 = getFrequencyVector(text1);
  const vec2 = getFrequencyVector(text2);
  const tokens = Object.keys(vec1);
  let sumSquares = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const diff = vec1[token] - vec2[token] || 0;
    sumSquares += diff ** 2;
  }
  return Math.sqrt(sumSquares);
}

function getFrequencyVector(text) {
  const tokens = text.split(" ");
  const freq = {};
  tokens.forEach((token) => {
    freq[token] = freq[token] ? freq[token] + 1 : 1;
  });
  return freq;
}

module.exports = euclideanDistance;
