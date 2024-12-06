#!/bin/sh
set -ex
rm -rf dist
./rollup.config.js --configJsr
scripts/emit-types.sh
scripts/emit-package-json.js
scripts/emit-jsr-json.js
