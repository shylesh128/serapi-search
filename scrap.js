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
    console.log(link);
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

module.exports = scrap;
