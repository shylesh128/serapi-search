const puppeteer = require("puppeteer");

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const main = async () => {
  const snippet =
    "A company makes three types of candy and packages them in three assortments. Assortment I contains 4 sour, 4 lemon, and 12 lime candies, and sells for $9.40";
  const link =
    "https://www.wyzant.com/resources/answers/120037/linear_programming_setup_help_please_much_appreciated";
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(link);

  await delay(5000);

  const elementsWithText = await page.$$("*");
  const desiredElement = await Promise.all(
    elementsWithText.map(async (element) => {
      const textContent = await page.evaluate((el) => el.textContent, element);
      if (textContent.trim().includes("A company")) {
        // console.log(element.textContent);
        return element.textContent;
      }
    })
  );

  console.log(desiredElement);

  await browser.close();
};

main();
