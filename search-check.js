const { getJson } = require("serpapi");

const params = {
  q: "apple",
  kl: "us-en",
  api_key: "ed1eea13ef0a99bf38d9c278ad834ec9cf38e08d3f041606a886ac5c30b1c17e",
};

// Show result as JSON
async function query() {
  const response = await getJson("duckduckgo", params);
  console.log(response);
}
query();
