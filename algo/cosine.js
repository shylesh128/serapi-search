const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const stopwords = natural.stopwords;

// Returns a bag of words for a given sentence
function getBagOfWords(sentence) {
  const tokens = tokenizer.tokenize(sentence);
  const bagOfWords = {};

  for (const token of tokens) {
    if (!stopwords.includes(token)) {
      bagOfWords[token] = bagOfWords[token] + 1 || 1;
    }
  }

  return bagOfWords;
}

// Returns the cosine similarity between two bags of words
function getCosineSimilarity(bagOfWords1, bagOfWords2) {
  const vector1 = [];
  const vector2 = [];

  // Get all unique words from both bags of words
  const words = new Set([
    ...Object.keys(bagOfWords1),
    ...Object.keys(bagOfWords2),
  ]);

  // Calculate the term frequency–inverse document frequency (tf-idf) for each word
  for (const word of words) {
    const tf1 = bagOfWords1[word] || 0;
    const tf2 = bagOfWords2[word] || 0;
    const idf = Math.log(2 / (tf1 + tf2));

    vector1.push(tf1 * idf);
    vector2.push(tf2 * idf);
  }

  // Calculate the cosine similarity between the two vectors
  const dotProduct = vector1.reduce(
    (sum, value, i) => sum + value * vector2[i],
    0
  );
  const magnitude1 = Math.sqrt(
    vector1.reduce((sum, value) => sum + value ** 2, 0)
  );
  const magnitude2 = Math.sqrt(
    vector2.reduce((sum, value) => sum + value ** 2, 0)
  );

  return (dotProduct / (magnitude1 * magnitude2)) * 100;
}

function cosineSimilarity(str1, query) {
  const bagOfWords1 = getBagOfWords(str1);
  const bagOfWords2 = getBagOfWords(query);
  const similarity = getCosineSimilarity(bagOfWords1, bagOfWords2);

  return similarity;
}

module.exports = cosineSimilarity;
