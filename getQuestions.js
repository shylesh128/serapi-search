const fs = require("fs");
const search = require("./serapi");

async function getQuestions(array, startWord, endWord) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].trim().toLowerCase() === startWord) {
      let j = i + 1;
      let question = "";
      while (array[j].trim().toLowerCase() !== endWord) {
        question += array[j].trim() + " ";
        j++;
      }
      result.push({ [result.length + 1]: question.trim() });
    }
  }
  const final = result.map(async function (item, index) {
    for (var key in item) {
      return {
        qID: parseInt(key),
        q: item[key],
        result: await search(item[key]),
      };
    }
  });

  return await Promise.all(final);
}

function getSentences(filePath) {
  const contents = fs.readFileSync(filePath, "utf8");
  const lines = contents.split("\n");
  const array = lines.filter((string) => string.trim() !== "");
  let startWord = "stem";
  let endWord = "options";
  const result = getQuestions(array, startWord, endWord);
  return result;
}

// getSentences("./res.txt");
module.exports = getSentences;
