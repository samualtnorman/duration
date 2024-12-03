#!/usr/bin/env node
import { mkdirSync as makeDirectorySync, writeFileSync } from "fs"
import packageJson from "../package.json" with { type: "json" }

const { name, version } = packageJson

makeDirectorySync("dist", { recursive: true })
writeFileSync("dist/jsr.json", JSON.stringify({ name, version, exports: `./index.js` }, undefined, "\t"))
process.exit()
