const natural = require("natural");
const cosineSimilarity = require("./algo/cosine");
const jaccardSimilarity = require("./algo/jaccard");
const euclideanDistance = require("./algo/euclidean");
const pearsonCorrelation = require("./algo/pearson");

const request = require("request");
const cheerio = require("cheerio");

function getLastIndex(length) {
  if (length > 250) {
    return 250;
  } else {
    return length;
  }
}

function scrap(link, snippet) {
  request(link, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const elements = $("div");

      const preview = [];
      const snippetLength = snippet.length;

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const text = $(element).text().trim();

        if (text.includes(snippet)) {
          const textIndex = text.indexOf(snippet);
          const startIndex = Math.max(textIndex - 200, 0);
          const endIndex = Math.min(
            textIndex + snippetLength + getLastIndex(text.length),
            text.length
          );
          const previewText = text.substring(startIndex, endIndex);
          preview.push(`...${previewText}...`);
        }
      }

      return preview[0];
    } else {
      return "not found";
    }
  });
}

function calculateMatchPercentage(str1, query, link, engine) {
  const tokenizer = new natural.WordTokenizer();
  const tokens1 = tokenizer.tokenize(str1);
  const tokens2 = tokenizer.tokenize(query);
  const overlap = new Set(tokens1.filter((token) => tokens2.includes(token)));

  const similarity =
    overlap.size / (tokens1.length + tokens2.length - overlap.size);
  const percenatge = Math.trunc(similarity * 100);

  return {
    engine: engine,
    normal: percenatge,
    cosine: Math.trunc(cosineSimilarity(str1, query)),
    jaccard: Math.trunc(jaccardSimilarity(str1, query)),
    euclidean: Math.trunc(euclideanDistance(str1, query)),
    pearson: Math.trunc(pearsonCorrelation(str1, query)),
  };
}

function addResultToLinksData(result, linksData, data, engineType) {
  const searchEngines = Object.keys(result);
  for (const engine of searchEngines) {
    if (result[engine]) {
      for (const res of result[engine]) {
        const link = res.link;
        if (!linksData[link]) {
          // console.log(res.link, "link");
          // console.log(res.snippet, "snip");
          linksData[link] = {
            engines: [engine],
            qid: [data.qID],
            snippets: [res.snippet],
            titles: [res.title],
            query: data.q,
            matchPercentages: [
              calculateMatchPercentage(res.snippet, data.q, res.link, engine),
            ],
            model: [scrap(res.link, res.snippet)],
          };
        } else {
          if (!linksData[link].engines.includes(engine)) {
            linksData[link].engines.push(engine);
          }
          if (!linksData[link].qid.includes(data.qID)) {
            linksData[link].qid.push(data.qID);
          }
          if (!linksData[link].snippets.includes(res.snippet)) {
            // linksData[link].snippets.push(res.snippet);
            // linksData[link].matchPercentages.push(
            //   calculateMatchPercentage(res.snippet, data.q, res.link, engine)
            // );
          }
          if (!linksData[link].titles.includes(res.title)) {
            linksData[link].titles.push(res.title);
          }
        }
      }
    }
  }
}

function sortAll(data) {
  const linksData = {};
  const linksDataEvi = {};
  const linksDataCom = {};
  const linksDataOpt = {};

  for (let i = 0; i < data.length; i++) {
    if (data[i].qResult) {
      addResultToLinksData(data[i].qResult, linksData, data[i], "qResult");
    }
    if (data[i].evidenceResult) {
      addResultToLinksData(
        data[i].evidenceResult,
        linksDataEvi,
        data[i],
        "evidenceResult"
      );
    }
    if (data[i].competencyResult) {
      addResultToLinksData(
        data[i].competencyResult,
        linksDataCom,
        data[i],
        "competencyResult"
      );
    }
    if (data[i].optionsResult) {
      addResultToLinksData(
        data[i].optionsResult,
        linksDataOpt,
        data[i],
        "optionsResult"
      );
    }
  }

  const data2 = {
    qLinks: linksData,
    evidenceLinks: linksDataEvi,
    competencyLinks: linksDataCom,
    optionsLinks: linksDataOpt,
  };

  fs.writeFileSync("./engines.json", JSON.stringify(data2));

  return {
    qLinks: linksData,
    evidenceLinks: linksDataEvi,
    competencyLinks: linksDataCom,
    optionsLinks: linksDataOpt,
  };
}

module.exports = sortAll;
