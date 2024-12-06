#!/usr/bin/env node
import { mkdirSync as makeDirectorySync, writeFileSync } from "fs"
import packageJson from "../package.json" with { type: "json" }

const { name, version, license } = packageJson

makeDirectorySync("dist", { recursive: true })
writeFileSync("dist/jsr.json", JSON.stringify({ name, version, exports: `./index.js`, license }, undefined, "\t"))
process.exit()
