# carousell-monitor-playlist

## local development

```bash
$ helloworld

# start browserless container
$ docker run -d --name test -p 3000:3000 -e "DEFAULT_LAUNCH_ARGS=[\"--disable-features=site-per-process\"]" browserless/chrome:1.57-chrome-stable

# 1. produce search result
$ cd carousell-search-scrape
$ npm i
$ node ./index.js
$ cd ..

# run monitor script, node 18
$ cd monitors
$ npm i
$ node ./index.js
$ cd ..

```

carousell-monitor-playlist

last_update: 2023-Oct-11
