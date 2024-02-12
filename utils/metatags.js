const puppeteer = require("puppeteer");

exports.getMetatags = async function (url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url);
    const title = await page.title();
    const { description, image } = await page.evaluate(() => {
      const description = document.querySelector(
        "meta[name='description']"
      )?.content;
      const image = document.querySelector(
        "meta[property='og:image']"
      )?.content;
      return { description, image };
    });
    return { title, description, image };
  } catch (err) {
    throw new Error(err.message);
  } finally {
    await browser.close();
  }
};
