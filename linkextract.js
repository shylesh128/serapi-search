const request = require("request");
const cheerio = require("cheerio");

async function checkerlinkExtract(snippet, link) {
  request(link, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const para = $("body");
      para.each((index, element) => {
        console.log($(element).text());
      });
      const text = `:contains("${snippet}")`;
      const $ = cheerio.load(html);
      const element = $(text).first();
      const string = element.text();
      const arr = string.split("\n").flat();
      const str = arr.find((elem) => elem.includes(snippet));
      console.log(str);
      return string;
    } else {
      //   callback(error, null);
      // return null;
      console.log(response.statusCode);
      console.log(error);
      console.log("not found");
    }
  });
}
