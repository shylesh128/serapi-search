const mammoth = require("mammoth");
const fs = require("fs");

mammoth
  .convertToHtml({ path: "./uploads/3069.1.5-14 questions.docx" })
  .then(function (result) {
    var html = result.value; // The raw text
    var messages = result.messages;

    fs.writeFileSync("./doc.html", html);
    // console.log(text);
  })
  .done();
