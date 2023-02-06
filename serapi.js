const { getJson } = require("serpapi");
const fs = require("fs");

async function search(query) {
  const api =
    "fe6e2aac76ba0a1896f319d4a959fcd743ab7a4930ceb7677d341d7fd8302448";
  const googleparams = {
    // q: "A company makes three types of candy and packages them in three assortments. Assortment I contains 4 sour, 4 lemon, and 12 lime candies and sells for $9.40. Assortment II contains 12 sour, 4 lemon, and 4 lime candies and sells for $7.60. Assortment III contains 8 sour, 8 lemon, and 8 lime candies and sells for $11.00. Manufacturing costs per piece of candy are $0.20 for sour, $0.25 for lemon, and $0.30 for lime candies. The company can make 5,200 sour, 3,800 lemon, and 6,000 lime candies weekly.",
    q: query,
    api_key: api,
  };
  const yahooparams = {
    p: query,
    api_key: api,
  };

  const bingparams = {
    q: query,
    // cc: "US",
    api_key: api,
  };
  const yandexparams = {
    text: query,
    api_key: api,
  };
  const duckduckGoParams = {
    q: query,
    api_key: api,
  };

  const googleRes = await getJson("google", googleparams);
  const yahooRes = await getJson("yahoo", yahooparams);
  const bingRes = await getJson("bing", bingparams);
  const yandexRes = await getJson("yandex", yandexparams);
  const duckduckGoRes = await getJson("duckduckgo", duckduckGoParams);

  const result = {
    google: googleRes["organic_results"],
    yahoo: yahooRes["organic_results"],
    bing: bingRes["organic_results"],
    yandex: yandexRes["organic_results"],
  };
  return result;
}

// function search(query) {
//   console.log(query);
//   return query;
// }

module.exports = search;
