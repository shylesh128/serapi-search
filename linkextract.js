const request = require("request");
const cheerio = require("cheerio");

async function checkerlinkExtract(snippet, link) {
  request(link, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const text = `:contains("${snippet}")`;
      const $ = cheerio.load(html);
      const element = $(text).first();
      const string = element.text();
      const arr = string.split("\n").flat();
      const str = arr.find((elem) => elem.includes(snippet));
      console.log(str);
      return str;
    } else {
      //   callback(error, null);
      // return null;
      console.log(response.statusCode);
      console.log(error);
      console.log("not found");
    }
  });
}

// const query =
//   "A company makes three types of candy and packages them in three assortments. Assortment I contains 4 sour, 4 lemon, and 12 lime candies, and sells for $9.40.";

// //   "A company makes three types of candy and packages them into three assortments. Assortment I contains 4 sour, 4 lemon, and 12 lime candies and sells for $9.40. Assortment II contains 12 sour, 4 lemon, 4 lime candies and sells for $7.60. Assortment III contains 8 sour, 8 lemon, and 8 lime candies and sells for $11.00 Manufacturing costs per piece of candy are .20 for sour, .25 for lemon, and .30 for lime. They can make 5,000 sour, 3,800 lemon, and 5,400 candies weekly. How many boxes of each type should the company produce each week in order to maximize its profit? What is the ";
// const link =
//   "https://www.chegg.com/homework-help/questions-and-answers/company-makes-three-types-candy-packages-three-assortments-assortment-contains-4-sour-4-le-q19108264";

// checkerlinkExtract(query, link);

// module.exports = checkerlinkExtract;
