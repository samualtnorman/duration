#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs"

const [ ,, readmePath, targetPath ] = process.argv

if (!(readmePath && targetPath))
	process.exit(1)

const readme = readFileSync(readmePath, { encoding: `utf8` })
const targetContent = readFileSync(targetPath, { encoding: `utf8` })

writeFileSync(
	targetPath,
	`/**\n * ${readme.trim().replaceAll(`*/`, `*\u200D/`).replaceAll(`\n`, `\n * `)}\n * @module\n */\n${targetContent}`
)
