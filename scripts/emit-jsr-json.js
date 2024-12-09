#!/usr/bin/env node
import { findFiles } from "@samual/lib/findFiles"
import { mkdirSync as makeDirectorySync, writeFileSync } from "fs"
import packageJson from "../package.json" with { type: "json" }

const { name, version, license } = packageJson

makeDirectorySync("dist", { recursive: true })

writeFileSync("dist/jsr.json", JSON.stringify({
	name,
	version,
	exports: {
		".": `./index.js`,
		...Object.fromEntries(
			(await findFiles(`dist`))
				.filter(path => path.endsWith(`.js`))
				.flatMap(path => [ [ `.${path.slice(4, -3)}`, `.${path.slice(4)}` ], [ `.${path.slice(4)}`, `.${path.slice(4)}` ] ])
		)
	},
	license
}, undefined, "\t"))

process.exit()
