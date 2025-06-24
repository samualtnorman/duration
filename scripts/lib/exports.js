import { findFiles } from "@samual/lib/findFiles"

export const getExports = async (
	/** @type {string} */ queryFileExtension,
	/** @type {string} */ outputFileExtension = queryFileExtension
) => ({
	".": `./index${outputFileExtension}`,
	...Object.fromEntries(
		(await findFiles(`dist`))
			.filter(path => path != `dist/index${queryFileExtension}` && path.endsWith(queryFileExtension))
			.map(path => {
                const sliced = `.${path.slice(4, -queryFileExtension.length)}`

                return [ sliced, sliced + outputFileExtension ]
            })
	)
})
