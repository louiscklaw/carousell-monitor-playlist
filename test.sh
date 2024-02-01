#!/usr/bin/env bash

set -x

set -ex

id

mkdir -p ./_tmp

docker run -t \
   --network browserless-net \
  -v ./carousell-post-scrape:/app \
  -v ./_tmp:/_tmp \
  --workdir /app node:18-buster ./entry.sh


docker run -t \
   --network browserless-net \
  -v ./carousell-search-scrape:/app \
  -v ./_tmp:/_tmp \
  --workdir /app node:18-buster ./entry.sh

docker run -it \
   --network browserless-net \
  -v ./monitors:/app \
  -v ./_tmp:/_tmp \
  --workdir /app node:18-buster ./entry.sh

# ./scripts/collect_result.sh
