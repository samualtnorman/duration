#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs"

const readme = readFileSync(`readme.md`, { encoding: `utf8` })
const index = readFileSync(`dist/index.d.ts`, { encoding: `utf8` })

writeFileSync(
	`dist/index.d.ts`,
	`/**\n * ${readme.trim().replaceAll(`*/`, `*\u200D/`).replaceAll(`\n`, `\n * `)}\n * @module\n */\n${index}`
)
