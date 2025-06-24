#!/usr/bin/env node
import { mkdirSync as makeDirectorySync, writeFileSync } from "fs"
import packageJson from "../package.json" with { type: "json" }
import { getExports } from "./lib/exports.js"

const { name, version, license, dependencies } = packageJson

makeDirectorySync("dist", { recursive: true })

writeFileSync("dist/jsr.json", JSON.stringify({
	name,
	version,
	license,
	exports: await getExports(`.ts`),
	imports: { "@samual/types": `jsr:@samual/types@${dependencies[`@samual/types`]}` }
}, undefined, "\t"))

process.exit()
