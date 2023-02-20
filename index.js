const express = require("express");
const textract = require("textract");
const bodyParser = require("body-parser");
const formidable = require("formidable");

const fs = require("fs");
const mammoth = require("mammoth");
// const contents = fs.readFileSync(
//   "D:/textract-nodejs/uploads/3069.1.5-14 questions.docx"
// );

const app = express();
var ejs = require("ejs");
const getAll = require("./readRes");
const sortAll = require("./sort");
const port = 3010;

app.set("view engine", "ejs");
const formidableOptions = {
  keepExtensions: true,
};

// configuration options to passed into textract
const config = {
  preserveLineBreaks: true,
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  //capture form and store reference inside "form"
  const form = new formidable.IncomingForm();
  form.parse(req);

  form.on("fileBegin", function (name, file) {
    file.filepath = __dirname + "/uploads/" + file.originalFilename;
    console.log(file.filepath);
  });

  // Display uploaded message to console
  form.on("file", function (name, file) {
    console.log("Uploaded file: " + file.originalFilename);

    // read text from document
    textract.fromFileWithPath(
      file.filepath,
      config,
      async function (error, text) {
        if (error) {
          console.log(error);
          res.status(400).send("Error");
        } else {
          console.log(file.filepath);
          // console.log("The text from the doc is: " + text);
          mammoth
            .convertToHtml({ path: file.filepath })
            .then(async function (result) {
              let html = result.value;
              let messages = result.messages;

              fs.writeFileSync("./res.txt", text);
              const all = await getAll(text);
              fs.writeFileSync("./results.json", JSON.stringify(all));
              fs.readFile("./outputs/all.json", "utf-8", (err, data) => {
                if (err) throw err;

                const all = JSON.parse(data);
                const sortedData = sortAll(all);

                // console.log(all);
                // console.log(sortedData);
                // Object.keys(sortedData).forEach(function (key) {
                //   console.log(Object.keys[key]);
                // });
                res.render("extracted", {
                  title: "My Page",
                  message: "Hello World",
                  data: all,
                  html: html,
                  links: sortedData,
                });
              });

              // res.render("extracted", {
              //   title: "My Page",
              //   message: "Hello World",
              //   data: all,
              //   html: html,
              // });

              // console.log(text);
            })
            .done();
        }
      }
    );
  });

  // res.send("File uploaded!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
