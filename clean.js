const fs = require("fs");
const natural = require("natural");

function cleanmyText(read) {
  //   const text = fs.readFileSync(read, "utf-8");

  const tokenizer = new natural.SentenceTokenizer();
  const sentences = tokenizer.tokenize(read);

  const cleanSentences = sentences.filter((sentence) => {
    const nonAlphas = sentence.replace(/[a-zA-Z]+/g, "").length;
    if (nonAlphas / sentence.length > 0.5) {
      return false;
    }

    if (sentence.length < 20 || sentence.length > 500) {
      return false;
    }

    const stopWords = ["lorem", "ipsum", "dolor", "sit", "amet"];
    if (stopWords.some((word) => sentence.toLowerCase().includes(word))) {
      return false;
    }

    return true;
  });

  return cleanSentences.join("\n");
}

// cleanmyText("./scrapData.txt", "./clean.txt");

module.exports = cleanmyText;
