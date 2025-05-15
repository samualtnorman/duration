#!/usr/bin/env node
import { mkdirSync as makeDirectorySync, writeFileSync } from "fs"
import packageJson_ from "../package.json" with { type: "json" }
import { exports } from "./lib/exports.js"

const { private: _, dependencies, devDependencies, engines: { pnpm, ...engines }, ...packageJson } = packageJson_

makeDirectorySync("dist", { recursive: true })
writeFileSync("dist/package.json", JSON.stringify({
	...packageJson,
	engines,
	exports,
	...process.argv[2] != `jsr` && { dependencies }
}, undefined, "\t"))
process.exit()
