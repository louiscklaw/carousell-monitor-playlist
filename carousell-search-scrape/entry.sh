#!/usr/bin/env bash

set -ex

rm -rf node_modules

npm i
node ./helloworld.js
node ./index.js
