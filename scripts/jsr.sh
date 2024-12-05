#!/bin/sh
set -ex
rm -rf dist
./rollup.config.js
scripts/emit-types.sh
scripts/emit-package-json.js
scripts/emit-jsr-json.js
cp LICENSE readme.md dist
