#!/bin/sh
set -ex
rm dist --recursive --force
./rollup.config.js --configJsr
scripts/emit-dts.sh
scripts/emit-package-json.js
scripts/emit-jsr-json.js
