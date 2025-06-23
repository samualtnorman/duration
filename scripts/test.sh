#!/bin/sh
set -ex
node_modules/.bin/knip
node_modules/.bin/tsc
node_modules/.bin/tsc --project src
node_modules/.bin/vitest run
