/**
 * Normalize and format durations of time.
 *
 * @example Basic Usage
 * ```ts
 * import { type Duration, normalizeDuration, formatDuration } from "@samual/duration"
 *
 * let duration: Duration = { years: 0, days: 0, hours: 0, milliseconds: Date.now() }
 *
 * normalizeDuration(duration)
 * console.log(duration) // { years: 54, days: 349, hours: 11, milliseconds: 2834227 }
 * duration.milliseconds = undefined
 * console.log(formatDuration(duration)) // "54 years, 349 days, 11 hours"
 * ```
 * @module
 */

import type { LaxPartial } from "@samual/lib"

/**
 * A duration of time.
 *
 * All properties are optional and must be set to
 * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) or an integer
 * (be able to pass
 * [`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)).
 * Absent properties and properties set to `undefined` are treated the same.
 * More units of time will be added in the future.
 *
 * @example Basic Usage
 * ```ts
 * import type { Duration } from "@samual/duration"
 *
 * let duration: Duration = { milliseconds: Date.now() }
 * ```
 */
export type Duration = LaxPartial<{
	/**
	 * The number of years in the duration. Same as 365 days.
	 *
	 * Must be set to
	 * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) or an
	 * integer (be able to pass
	 * [`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)).
	 */
	years: number,

	/**
	 * The number of days in the duration. Same as 24 hours
	 *
	 * Must be set to
	 * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) or an
	 * integer (be able to pass
	 * [`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)).
	 */
	days: number,

	/**
	 * The number of hours in the duration. Same as 60 minutes
	 *
	 * Must be set to
	 * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) or an
	 * integer (be able to pass
	 * [`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)).
	 */
	hours: number,

	/**
	 * The number of minutes in the duration. Same as 60 seconds
	 *
	 * Must be set to
	 * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) or an
	 * integer (be able to pass
	 * [`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)).
	 */
	minutes: number,

	/**
	 * The number of seconds in the duration. Same as 1000 milliseconds
	 *
	 * Must be set to
	 * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) or an
	 * integer (be able to pass
	 * [`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)).
	 */
	seconds: number,

	/**
	 * The number of milliseconds in the duration.
	 *
	 * Must be set to
	 * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) or an
	 * integer (be able to pass
	 * [`Number.isInteger()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)).
	 */
	milliseconds: number
}>

export { DurationError } from "./DurationError"
export { formatDuration, FormatDurationError, FormatEmptyDurationError, FormatNonIntegerDurationError, type FormatDurationOptions } from "./formatDuration"
export { normalizeDuration, NormalizeDurationError, NormalizeNonIntegerDurationError } from "./normalizeDuration"
