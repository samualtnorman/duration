import { findFiles } from "@samual/lib/findFiles"

export const exports = ({
	".": `./index.js`,
	...Object.fromEntries(
		(await findFiles(`dist`))
			.filter(path => path != `dist/index.js` && path.endsWith(`.js`))
			.map(path => [ `.${path.slice(4, -3)}`, `.${path.slice(4)}` ])
	)
})
