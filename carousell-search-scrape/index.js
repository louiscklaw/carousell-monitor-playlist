const express = require('express');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');
var encodeUrl = require('encodeurl');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  var browser;
  var output = {
    state: 'init',
    debug: {},
    error: {},
    scrape_result: [],
    news_link: [],
    feed_discord: { last_update: new Date().toISOString(), links: [] },
  };

  try {
    var output = { state: 'init', debug: {}, error: {}, result: {} };

    async function scrapeCarousellSearchResult(page) {
      return await page.evaluate(() => {
        var result_list = [];

        document
          .querySelector('.asm-browse-listings')
          .querySelectorAll('div[data-testid*="listing-card"]')
          .forEach(e => {
            var seller_name = e.querySelector('[data-testid*="listing-card-text-seller-name"]').textContent;
            var post_age = e.querySelectorAll('p')[1].textContent;
            var post_title = e.querySelectorAll('p')[2].textContent;
            var post_link = e.querySelector('a').getAttribute('href');
            result_list.push({ seller_name, post_age, post_title, post_link });
          });

        return JSON.stringify(result_list);
      });

      // seller name
      // document.querySelector('.asm-browse-listings').querySelectorAll('div[data-testid*="listing-card"]')[0].querySelector('[data-testid*="listing-card-text-seller-name"]').textContent

      // post age
      // document.querySelector('.asm-browse-listings').querySelectorAll('div[data-testid*="listing-card"]')[0].querySelectorAll('p')[1]

      // post title
      // document.querySelector('.asm-browse-listings').querySelectorAll('div[data-testid*="listing-card"]')[0].querySelectorAll('p')[3]
    }

    async function testKeyword(kw, step_num) {
      try {
        browser = await puppeteer.connect({ browserWSEndpoint: `ws://browserless:3000` });
        var page;

        page = await browser.newPage();

        console.log(`testing ${kw}...`);
        const carousell_url = `https://www.carousell.com.hk/search/${kw}`;

        await page.goto(encodeUrl(carousell_url), { waitUntil: 'networkidle0' });
        await page.setViewport({ width: 1920, height: 1080 * 5 });

        await page.content();
        console.log('sleep before take screenshot');

        const png_path = `./screens/${step_num}-${kw}-helloworld.png`;
        console.log(`write screenshot ${png_path}`);
        await page.screenshot({ path: png_path });

        var search_result = await scrapeCarousellSearchResult(page);
        var search_result_json = JSON.parse(search_result);
        return search_result_json;
      } catch (error) {
        console.log(error);
        console.log(`${kw} testKeyword failed`);

        const png_path = `./screens/${step_num}-${kw}-failed.png`;
        await page.screenshot({ path: png_path });

        process.exit();
      }
    }

    var keyword_list = ['python', 'coding', 'vba', 'programming', 'javascript', 'tableau', 'wordpress'];

    for (var i = 0; i < keyword_list.length; i++) {
      try {
        var kw = keyword_list[i];

        output.result[`search_using_${kw}`] = await testKeyword(kw, (i + 1) * 100);
      } catch (error) {
        console.log(error);
      }
    }

    await fs.writeFileSync('/_tmp/results/carousell_search_result.json', JSON.stringify(output, null, 2), {
      encoding: 'utf-8',
    });
  } catch (error) {
    // console.log(error);
    // output = { ...output, state: 'error puppeteer-carousell-helloworld.js', error };
    console.log(error);
  }
})();
