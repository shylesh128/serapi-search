const axios = require("axios");
const fs = require("fs");

async function google(query) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyDXMg7bLzigo-sZPz3xrilYEQ5iaw6ME10&cx=22ec00a418fde4de5&q=${query}`
    );
    console.log(response.data);
    fs.writeFileSync("./custom.json", JSON.stringify(response.data));
  } catch (error) {
    console.error(error);
  }
}

google("coffee");
