/**
 * Parent error of all errors intentionally thrown by `@samual/duration`.
 *
 * @example Basic Usage
 * ```ts
 * import { type Duration, normalizeDuration, formatDuration } from "@samual/duration"
 *
 * try {
 * 	// ...
 * } catch (error) {
 * 	if (error instanceof DurationError)
 * 		console.error("Caught", error)
 * 	else
 * 		throw error
 * }
 * ```
 */
export class DurationError extends Error {}
Object.defineProperty(DurationError.prototype, `name`, { value: `DurationError` })
