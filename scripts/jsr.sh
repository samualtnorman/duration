#!/bin/sh
set -ex
rm dist --recursive --force
./rollup.config.js --configJsr
scripts/emit-dts.sh
scripts/prepend-readme.js
scripts/emit-package-json.js jsr
scripts/emit-jsr-json.js
