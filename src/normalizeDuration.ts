/**
 * Normalize a {@linkcode Duration}.
 *
 * @example Basic Usage
 * ```ts
 * import { type Duration, normalizeDuration } from "@samual/duration/normalizeDuration"
 *
 * let duration: Duration = { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: Date.now() }
 *
 * normalizeDuration(duration)
 * console.log(duration) // { years: 54, days: 349, hours: 11, minutes: 47, seconds: 14, milliseconds: 227 }
 * ```
 *
 * @module
 */

import { type Duration, DurationError } from "."

/**
 * Error that can be thrown by {@linkcode normalizeDuration()}.
 *
 * @example Basic Usage
 * ```ts
 * import { normalizeDuration, NormalizeDurationError } from "@samual/duration"
 *
 * try {
 * 	normalizeDuration(duration)
 * } catch (error) {
 * 	if (error instanceof NormalizeDurationError) {
 * 		// ...
 * 	} else
 * 		throw error
 * }
 * ```
 */
export class NormalizeDurationError extends DurationError {}
Object.defineProperty(NormalizeDurationError.prototype, `name`, { value: `NormalizeDurationError` })

/**
 * Error that can be thrown by {@linkcode normalizeDuration()} for trying to normalize non-integers.
 *
 * @example Basic Usage
 * ```ts
 * import { normalizeDuration, NormalizeNonIntegerDurationError } from "@samual/duration"
 *
 * try {
 * 	normalizeDuration(duration)
 * } catch (error) {
 * 	if (error instanceof NormalizeNonIntegerDurationError) {
 * 		// ...
 * 	} else
 * 		throw error
 * }
 * ```
 */
export class NormalizeNonIntegerDurationError extends NormalizeDurationError {}
Object.defineProperty(NormalizeNonIntegerDurationError.prototype, `name`, { value: `NormalizeDurationNonIntegerError` })

/**
 * Normalize a {@linkcode Duration}.
 *
 * e.g. 120,000 milliseconds becomes 2 minutes.
 *
 * This function mutates the given `Duration`, hence why it doesn't return anything.
 *
 * @param duration The {@linkcode Duration} to be normalized.
 * @throws Any {@linkcode NormalizeDurationError}.
 * @throws A {@linkcode NormalizeNonIntegerDurationError} for trying to normalize a duration with numbers that aren't integers.
 *
 * @example Basic Usage
 * ```ts
 * import { type Duration, normalizeDuration } from "@samual/duration"
 *
 * let duration: Duration = { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: Date.now() }
 *
 * normalizeDuration(duration)
 * console.log(duration) // { years: 54, days: 349, hours: 11, minutes: 47, seconds: 14, milliseconds: 227 }
 * ```
 */
export function normalizeDuration(duration: Duration): void {
	if (Object.values(duration).some(value => value && !Number.isInteger(value)))
		throw new NormalizeNonIntegerDurationError(`Given number must be an integer`)

	let milliseconds = duration.milliseconds ?? 0
	let seconds = duration.seconds ?? 0
	let minutes = duration.minutes ?? 0
	let hours = duration.hours ?? 0
	let days = duration.days ?? 0
	let years = duration.years ?? 0

	seconds += Math.floor(milliseconds / 1000)
	milliseconds %= 1000
	minutes += Math.floor(seconds / 60)
	seconds %= 60
	hours += Math.floor(minutes / 60)
	minutes %= 60
	days += Math.floor(hours / 24)
	hours %= 24
	years += Math.floor(days / 365)
	days %= 365

	if (duration.years != undefined)
		duration.years = years
	else
		days += years * 365

	if (duration.days != undefined)
		duration.days = days
	else
		hours += days * 24

	if (duration.hours != undefined)
		duration.hours = hours
	else
		minutes += hours * 60

	if (duration.minutes != undefined)
		duration.minutes = minutes
	else
		seconds += minutes * 60

	if (duration.seconds != undefined)
		duration.seconds = seconds
	else
		milliseconds += seconds * 1000

	if (duration.milliseconds != undefined)
		duration.milliseconds = milliseconds
}

if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest

	test(`normalizeDuration() throws for non-integers`, () => {
		expect(() => normalizeDuration({ seconds: 1.5 })).toThrow(NormalizeNonIntegerDurationError)
	})

	test(`normalizeDuration() only produces integers`, () => {
		const duration: Duration = { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 1733140034227 }

		normalizeDuration(duration)

		expect(duration).toEqual({
			years: 54,
			days: 349,
			hours: 11,
			minutes: 47,
			seconds: 14,
			milliseconds: 227
		})
	})
}
