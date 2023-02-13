const fs = require("fs");

fs.readFile("./outputs/all.json", "utf-8", (err, output) => {
  if (err) throw err;

  const data = JSON.parse(output);

  const googleArr = [];
  const yahooArr = [];
  const bingArr = [];
  const yandexArr = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].qResult) {
      const searchEngines = ["google", "yahoo", "bing", "yandex"];
      for (const engine of searchEngines) {
        if (data[i].qResult[engine]) {
          for (const result of data[i].qResult[engine]) {
            if (engine === "google") {
              googleArr.push(result.link);
            } else if (engine === "yahoo") {
              yahooArr.push(result.link);
            } else if (engine === "bing") {
              bingArr.push(result.link);
            } else if (engine === "yandex") {
              yandexArr.push(result.link);
            }
          }
        }
      }
    }
  }

  console.log(yahooArr);

  const uniqueGoogleArr = googleArr.filter((c, index) => {
    return googleArr.indexOf(c) === index;
  });
  const uniqueYahooArr = yahooArr.filter((c, index) => {
    return yahooArr.indexOf(c) === index;
  });

  console.log(uniqueYahooArr);
});
