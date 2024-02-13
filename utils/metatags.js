const puppeteer = require("puppeteer");

exports.getMetatags = async function (linkUrl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(linkUrl);
    const title = await page.title();
    const { description, imageUrl } = await page.evaluate(() => {
      const description = document.querySelector(
        "meta[name='description']"
      )?.content;
      const imageUrl = document.querySelector(
        "meta[property='og:image']"
      )?.content;
      return { description, imageUrl };
    });
    return { title, description, imageUrl };
  } catch (err) {
    throw new Error(err.message);
  } finally {
    await browser.close();
  }
};
