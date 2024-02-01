#!/usr/bin/env bash

set -ex

node -v

mkdir -p ./_tmp

docker run -t \
   --network browserless-net \
  -u 1000:1000 \
  -v ./carousell-post-scrape:/app \
  -v ./_tmp:/_tmp \
  --workdir /app node:18-buster ./entry.sh


docker run -t \
   --network browserless-net \
  -u 1000:1000 \
  -v ./carousell-search-scrape:/app \
  -v ./_tmp:/_tmp \
  --workdir /app node:18-buster ./entry.sh

docker run -it \
   --network browserless-net \
  -u 1000:1000 \
  -v ./monitors:/app \
  -v ./_tmp:/_tmp \
  --workdir /app node:18-buster ./entry.sh

# ./scripts/collect_result.sh
