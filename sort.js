const fs = require("fs");
const { URL } = require("url");
const natural = require("natural");
const { Stopwords } = require("natural");
const checkerlinkExtract = require("./linkextract");
const cosineSimilarity = require("./algo/cosine");
const jaccardSimilarity = require("./algo/jaccard");
const euclideanDistance = require("./algo/euclidean");
const pearsonCorrelation = require("./algo/pearson");

function sortAll() {
  fs.readFile("./outputs/all.json", "utf-8", (err, output) => {
    if (err) throw err;

    const data = JSON.parse(output);

    const linksData = {};
    const linksDataEvi = {};
    const linksDataCom = {};
    const linksDataOpt = {};

    for (let i = 0; i < data.length; i++) {
      if (data[i].qResult) {
        const searchEngines = Object.keys(data[i].qResult);
        for (const engine of searchEngines) {
          if (data[i].qResult[engine]) {
            for (const result of data[i].qResult[engine]) {
              const link = result.link;
              if (!linksData[link]) {
                linksData[link] = {
                  engines: [engine],
                  qid: [data[i].qID],
                  snippets: [result.snippet],
                  titles: [result.title],
                  query: data[i].q,
                  matchPercentages: [
                    calculateMatchPercentage(
                      result.snippet,
                      data[i].q,
                      result.link
                    ),
                  ],
                };
              } else {
                if (!linksData[link].engines.includes(engine)) {
                  linksData[link].engines.push(engine);
                }
                if (!linksData[link].qid.includes(data[i].qID)) {
                  linksData[link].qid.push(data[i].qID);
                }
                if (!linksData[link].snippets.includes(result.snippet)) {
                  linksData[link].snippets.push(result.snippet);
                  linksData[link].matchPercentages.push(
                    calculateMatchPercentage(
                      result.snippet,
                      data[i].q,
                      result.link
                    )
                  );
                }
                if (!linksData[link].titles.includes(result.title)) {
                  linksData[link].titles.push(result.title);
                }
              }
            }
          }
        }
      }
      if (data[i].evidenceResult) {
        const searchEngines = Object.keys(data[i].evidenceResult);
        for (const engine of searchEngines) {
          if (data[i].evidenceResult[engine]) {
            for (const result of data[i].evidenceResult[engine]) {
              const link = result.link;
              if (!linksDataEvi[link]) {
                linksDataEvi[link] = {
                  engines: [engine],
                  qid: [data[i].qID],
                  snippets: [result.snippet],
                  titles: [result.title],
                  query: data[i].q,
                  matchPercentages: [
                    calculateMatchPercentage(
                      result.snippet,
                      data[i].q,
                      result.link
                    ),
                  ],
                };
              } else {
                if (!linksDataEvi[link].engines.includes(engine)) {
                  linksDataEvi[link].engines.push(engine);
                }
                if (!linksDataEvi[link].qid.includes(data[i].qID)) {
                  linksDataEvi[link].qid.push(data[i].qID);
                }
                if (!linksDataEvi[link].snippets.includes(result.snippet)) {
                  linksDataEvi[link].snippets.push(result.snippet);
                  linksDataEvi[link].matchPercentages.push(
                    calculateMatchPercentage(
                      result.snippet,
                      data[i].q,
                      result.link
                    )
                  );
                }
                if (!linksDataEvi[link].titles.includes(result.title)) {
                  linksDataEvi[link].titles.push(result.title);
                }
              }
            }
          }
        }
      }
      if (data[i].competencyResult) {
        const searchEngines = Object.keys(data[i].competencyResult);
        for (const engine of searchEngines) {
          if (data[i].competencyResult[engine]) {
            for (const result of data[i].competencyResult[engine]) {
              const link = result.link;
              if (!linksDataCom[link]) {
                linksDataCom[link] = {
                  engines: [engine],
                  qid: [data[i].qID],
                  snippets: [result.snippet],
                  titles: [result.title],
                  query: data[i].q,
                  matchPercentages: [
                    calculateMatchPercentage(
                      result.snippet,
                      data[i].q,
                      result.link
                    ),
                  ],
                };
              } else {
                if (!linksDataCom[link].engines.includes(engine)) {
                  linksDataCom[link].engines.push(engine);
                }
                if (!linksDataCom[link].qid.includes(data[i].qID)) {
                  linksDataCom[link].qid.push(data[i].qID);
                }
                if (!linksDataCom[link].snippets.includes(result.snippet)) {
                  linksDataCom[link].snippets.push(result.snippet);
                  linksDataCom[link].matchPercentages.push(
                    calculateMatchPercentage(
                      result.snippet,
                      data[i].q,
                      result.link
                    )
                  );
                }
                if (!linksDataCom[link].titles.includes(result.title)) {
                  linksDataCom[link].titles.push(result.title);
                }
              }
            }
          }
        }
      }
      if (data[i].optionsResult) {
        const searchEngines = Object.keys(data[i].optionsResult);
        for (const engine of searchEngines) {
          if (data[i].optionsResult[engine]) {
            for (const result of data[i].optionsResult[engine]) {
              const link = result.link;
              if (!linksDataOpt[link]) {
                linksDataOpt[link] = {
                  engines: [engine],
                  qid: [data[i].qID],
                  snippets: [result.snippet],
                  titles: [result.title],
                  query: data[i].q,
                  matchPercentages: [
                    calculateMatchPercentage(
                      result.snippet,
                      data[i].q,
                      result.link
                    ),
                  ],
                };
              } else {
                if (!linksDataOpt[link].engines.includes(engine)) {
                  linksDataOpt[link].engines.push(engine);
                }
                if (!linksDataOpt[link].qid.includes(data[i].qID)) {
                  linksDataOpt[link].qid.push(data[i].qID);
                }
                if (!linksDataOpt[link].snippets.includes(result.snippet)) {
                  linksDataOpt[link].snippets.push(result.snippet);
                  linksDataOpt[link].matchPercentages.push(
                    calculateMatchPercentage(
                      result.snippet,
                      data[i].q,
                      result.link
                    )
                  );
                }
                if (!linksDataOpt[link].titles.includes(result.title)) {
                  linksDataOpt[link].titles.push(result.title);
                }
              }
            }
          }
        }
      }
    }

    function calculateMatchPercentage(str1, query, link) {
      const tokenizer = new natural.WordTokenizer();
      const tokens1 = tokenizer.tokenize(str1);
      const tokens2 = tokenizer.tokenize(query);
      const overlap = new Set(
        tokens1.filter((token) => tokens2.includes(token))
      );
      const similarity =
        overlap.size / (tokens1.length + tokens2.length - overlap.size);
      const percenatge = similarity * 100;

      return {
        normal: percenatge,
        cosine: cosineSimilarity(str1, query),
        jaccard: jaccardSimilarity(str1, query),
        euclidean: euclideanDistance(str1, query),
        pearson: pearsonCorrelation(str1, query),
      };
    }

    fs.writeFileSync("./engines.json", JSON.stringify(linksData));

    return {
      qLinks: linksData,
      evidenceLinks: linksDataEvi,
      competencyLinks: linksDataCom,
      optionsLinks: linksDataOpt,
    };
  });
}
// console.time("for");
// sort();
// console.timeEnd("for");
module.exports = sortAll;
