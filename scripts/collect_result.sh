#!/usr/bin/env bash

set -x

rm -rf ./public/*.json

cp monitors/results/post_test_result.json ./public

cp carousell-search-scrape/results/carousell_search_result.json ./public

# cp carousell-post-scrape/results/carousell_post_result.json ./public
