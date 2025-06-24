#!/bin/sh
set -ex
rm dist --recursive --force
mkdir dist --parents
cp src/*.ts dist
scripts/prepend-readme.js readme.md dist/index.ts
scripts/emit-jsr-json.js
