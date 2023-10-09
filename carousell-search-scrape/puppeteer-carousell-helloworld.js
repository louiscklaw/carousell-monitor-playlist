const express = require('express');
const puppeteer = require('puppeteer-extra');
const fs = require('fs');

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

  browser && browser.close();
})();

console.log('puppeteer-carousell-helloworld');
