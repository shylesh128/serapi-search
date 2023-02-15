const { getJson } = require("serpapi");

async function search(query) {
  const api =
    "13e3f7764283f5dce7da438eb15aadc138b42e8944dfc41107cd9778bde5464c";

  const googleparams = {
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

  const googleRes = await getJson("google", googleparams);
  const yahooRes = await getJson("yahoo", yahooparams);
  const bingRes = await getJson("bing", bingparams);
  const yandexRes = await getJson("yandex", yandexparams);

  const result = {
    google: googleRes["organic_results"],
    yahoo: yahooRes["organic_results"],
    bing: bingRes["organic_results"],
    yandex: yandexRes["organic_results"],
  };

  return result;
}

module.exports = search;
