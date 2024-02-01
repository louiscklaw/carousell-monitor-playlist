#!/usr/bin/env bash

set -ex

rm -rf node_modules
npm i

node ./my_post/index.js

