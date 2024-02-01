#!/usr/bin/env bash

set -ex

docker run -d \
    --name test \
    -p 3000:3000 \
    -e "DEFAULT_LAUNCH_ARGS=[\"--window-size=1920,3080\"]" \
    browserless/chrome:1.60-chrome-stable
