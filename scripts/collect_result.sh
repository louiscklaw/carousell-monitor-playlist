#!/usr/bin/env bash

set -x

rm -rf ./public/*.json

cp _tmp/results/post_test_result.json ./public &
cp _tmp/results/carousell_search_result.json ./public &

wait


echo 'copy done'

# cp carousell-post-scrape/results/carousell_post_result.json ./public
