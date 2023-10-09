const express = require('express');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');

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
    browser = await puppeteer.connect({ browserWSEndpoint: `ws://localhost:3000` });
    const page = await browser.newPage();
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

    // Full puppeteer API is available
    await page.goto('https://www.carousell.com.hk/search/vba', { waitUntil: 'networkidle2' });
    await page.setViewport({ width: 1920, height: 1080 * 5 });
    await page.screenshot({ path: './screens/100-vba-helloworld.png' });
    var search_result = await scrapeCarousellSearchResult(page);
    var search_result_json = JSON.parse(search_result);
    output.result['search_using_vba'] = search_result_json;

    await page.goto('https://www.carousell.com.hk/search/coding', { waitUntil: 'networkidle2' });
    await page.setViewport({ width: 1920, height: 1080 * 5 });
    await page.screenshot({ path: './screens/200-coding-helloworld.png' });
    var search_result = await scrapeCarousellSearchResult(page);
    var search_result_json = JSON.parse(search_result);
    output.result['search_using_coding'] = search_result_json;

    await page.goto('https://www.carousell.com.hk/search/programming', { waitUntil: 'networkidle2' });
    await page.setViewport({ width: 1920, height: 1080 * 5 });
    await page.screenshot({ path: './screens/300-programming-helloworld.png' });
    var search_result = await scrapeCarousellSearchResult(page);
    var search_result_json = JSON.parse(search_result);
    output.result['search_using_programming'] = search_result_json;
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error puppeteer-carousell-helloworld.js', error };
  }

  fs.writeFileSync('./results/carousell_search_result.json', JSON.stringify(output, null, 2), { encoding: 'utf-8' });

  browser && browser.close();
})();

console.log('puppeteer-carousell-helloworld');
