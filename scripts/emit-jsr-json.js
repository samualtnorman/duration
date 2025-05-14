#!/usr/bin/env node
import { findFiles } from "@samual/lib/findFiles"
import { mkdirSync as makeDirectorySync, writeFileSync } from "fs"
import packageJson from "../package.json" with { type: "json" }

const { name, version, license, dependencies } = packageJson

makeDirectorySync("dist", { recursive: true })

writeFileSync("dist/jsr.json", JSON.stringify({
	name,
	version,
	license,
	exports: {
		".": `./index.js`,
		...Object.fromEntries(
			(await findFiles(`dist`))
				.filter(path => path != `dist/index.js` && path.endsWith(`.js`))
				.map(path => [ `.${path.slice(4, -3)}`, `.${path.slice(4)}` ])
		)
	},
	imports: { "@samual/types": `jsr:@samual/types@${dependencies[`@samual/types`]}` }
}, undefined, "\t"))

process.exit()
