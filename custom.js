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

// const query =
//   "A company makes three types of candy and packages them in three assortments. Assortment I contains 4 sour, 4 lemon, and 12 lime candies and sells for $9.40. Assortment II contains 12 sour, 4 lemon, and 4 lime candies and sells for $7.60. Assortment III contains 8 sour, 8 lemon, and 8 lime candies and sells for $11.00. Manufacturing costs per piece of candy are $0.20 for sour, $0.25 for lemon, and $0.30 for lime candies. The company can make 5,200 sour, 3,800 lemon, and 6,000 lime candies weekly. What will be the constraints to solve this problem with linear programming? ";
// google(query);

// api_key "AIzaSyDn3USxKa7Ec1u6QP1D0y7qjytoqT_bDUc"
// AIzaSyDXMg7bLzigo-sZPz3xrilYEQ5iaw6ME10
// <script async src="https://cse.google.com/cse.js?cx=22ec00a418fde4de5">
// </script>
// <div class="gcse-search"></div>

module.exports = google;
