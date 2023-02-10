const fs = require("fs");
const search = require("./serapi");

function getQuestions(array, startWord, endWord) {
  const result = [];
  let j = 0;
  for (let i = 0; i < array.length; i++) {
    const currentWord = array[i].trim().toLowerCase();
    if (currentWord === startWord) {
      j = i + 1;
      let question = "";
      while (array[j].trim().toLowerCase() !== endWord) {
        question += array[j].trim() + " ";
        j++;
      }
      result.push({ qID: result.length + 1, q: question.trim() });
    }
  }

  return result;
}

function getEvidence(array, startWord, endWord) {
  let j = 0;
  let result = [];
  for (let i = 0; i < array.length; i++) {
    const currentWord = array[i].trim().toLowerCase();
    if (currentWord === startWord) {
      j = i + 1;
      let question = "";
      while (array[j].trim().toLowerCase() !== endWord) {
        question += array[j].trim() + " ";
        j++;
      }
      result.push({ qID: result.length + 1, evidence: question.trim() });
    }
  }

  return result;
}

function getCompentency(array, startWord, endWord) {
  let j = 0;
  let result = [];
  for (let i = 0; i < array.length; i++) {
    const currentWord = array[i].trim().toLowerCase();
    if (currentWord === startWord) {
      j = i + 1;
      let question = "";
      while (array[j].trim().toLowerCase() !== endWord) {
        question += array[j].trim() + " ";
        j++;
      }
      result.push({ qID: result.length + 1, competency: question.trim() });
    }
  }

  return result;
}

function getOptions(array, startWord, endWord) {
  let j = 0;
  let result = [];
  for (let i = 0; i < array.length; i++) {
    const currentWord = array[i].trim().toLowerCase();
    if (currentWord === startWord) {
      j = i + 1;
      let question = "";
      while (array[j].trim().toLowerCase() !== endWord) {
        question += array[j].trim() + " ";
        j++;
      }
      result.push({ qID: result.length + 1, options: question.trim() });
    }
  }

  return result;
}

async function getAll(filePath) {
  const contents = fs.readFileSync(filePath, "utf8");
  const lines = contents.split("\n");
  const array = lines.filter((string) => string.trim() !== "");
  const result = getQuestions(array, "stem", "options");
  const evidence = getEvidence(array, "evidence statement", "competency");
  const competency = getCompentency(array, "competency", "stem");
  const options = getOptions(array, "options", "lr reference");

  const final = result.reduce((acc, obj) => {
    const match1 = evidence.find((o) => o.qID === obj.qID);
    const match2 = competency.find((o) => o.qID === obj.qID);
    const match3 = options.find((o) => o.qID === obj.qID);
    if (match1 && match2 && match3) {
      acc.push({ ...obj, ...match1, ...match2, ...match3 });
    }
    return acc;
  }, []);

  const searchedArray = final.map(async function (obj) {
    return {
      ...obj,
      qResult: await search(obj.q),
      evidenceResult: await search(obj.evidence),
      competencyResult: await search(obj.competency),
      optionsResult: await search(obj.options),
    };
  });

  return await Promise.all(searchedArray);
}
// getAll("./res.txt");
module.exports = getAll;
