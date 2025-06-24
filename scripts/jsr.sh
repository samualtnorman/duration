#!/bin/sh
set -ex
rm dist --recursive --force
mkdir dist --parents
cp src/*.ts dist
scripts/prepend-readme.js readme.md dist/default.ts
scripts/emit-jsr-json.js
