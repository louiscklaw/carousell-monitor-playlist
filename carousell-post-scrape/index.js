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

    // Full puppeteer API is available
    await page.goto('https://www.carousell.com.hk/p/1191576500', { waitUntil: 'networkidle2' });
    await page.setViewport({ width: 1920, height: 1080 * 5 });
    await page.screenshot({ path: './screens/100-post-test-vector-helloworld.png' });
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error puppeteer-carousell-helloworld.js', error };
  }

  browser && browser.close();
})();
