/**
Normalize and format durations of time.

```ts
import { type Duration, normalizeDuration, formatDuration } from "@samual/duration"

let duration: Duration = { years: 0, days: 0, hours: 0, milliseconds: Date.now() }

normalizeDuration(duration)
console.log(duration) // { years: 54, days: 349, hours: 11, milliseconds: 2834227 }
duration.milliseconds = undefined
console.log(formatDuration(duration)) // "54 years, 349 days, 11 hours"
```
@module
*/

import type { LaxPartial } from "@samual/lib"

/**
A duration of time.

Properties set to
[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) are treated as
if they don't exist. The presence of properties is optional, absent properties are treated the same as if they are set
to `undefined`. Properties are optional for forwards compatibilty. i.e. A **`Duration`** generated with an old version
of this library can be used with the {@linkcode formatDuration()} from a future version of this library.

In the future, more units of time will be added, these units can be inserted in between existing ones.

@example Basic usage
```ts
import type { Duration } from "@samual/duration"

let duration: Duration = { milliseconds: Date.now() }
```
*/
export type Duration = LaxPartial<{
	/** The number of years in the duration. Same as 365 days. */ years: number,
	/** The number of days in the duration. Same as 24 hours */ days: number,
	/** The number of hours in the duration. Same as 60 minutes */ hours: number,
	/** The number of minutes in the duration. Same as 60 seconds */ minutes: number,
	/** The number of seconds in the duration. Same as 1000 milliseconds */ seconds: number,
	/** The number of milliseconds in the duration. */ milliseconds: number
}>

/** Error that can be thrown by {@linkcode normalizeDuration()}. */
export class NormalizeDurationError extends Error {}
Object.defineProperty(NormalizeDurationError.prototype, `name`, { value: `NormalizeDurationError` })

/** Error that can be thrown by {@linkcode normalizeDuration()} for trying to normalize non-integers. */
export class NormalizeNonIntegerDurationError extends NormalizeDurationError {}
Object.defineProperty(NormalizeNonIntegerDurationError.prototype, `name`, { value: `NormalizeDurationNonIntegerError` })

/**
Normalize a {@linkcode Duration}.

e.g. 120,000 milliseconds becomes 2 minutes.

This function mutates the given `Duration`, hence why it doesn't return anything.

@param duration The {@linkcode Duration} to be normalized.

@example Basic usage
```ts
import { type Duration, normalizeDuration } from "@samual/duration"

let duration: Duration = { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: Date.now() }

normalizeDuration(duration)
console.log(duration) // { years: 54, days: 349, hours: 11, minutes: 47, seconds: 14, milliseconds: 227 }
```
*/
export function normalizeDuration(duration: Duration): void {
	if (Object.values(duration).some(value => value && !Number.isInteger(value)))
		throw new NormalizeNonIntegerDurationError(`Duration properties must be set to undefined or integers`)

	let milliseconds = duration.milliseconds ?? 0
	let seconds = duration.seconds ?? 0
	let minutes = duration.minutes ?? 0
	let hours = duration.hours ?? 0
	let days = duration.days ?? 0
	let years = duration.years ?? 0

	seconds += milliseconds / 1000
	milliseconds %= 1000
	minutes += seconds / 60
	seconds %= 60
	hours += minutes / 60
	minutes %= 60
	days += hours / 24
	hours %= 24
	years += days / 365
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

/** Error that can be thrown by {@linkcode formatDuration()}. */
export class FormatDurationError extends Error {}
Object.defineProperty(FormatDurationError.prototype, `name`, { value: `FormatDurationError` })

/** Error that can be thrown by {@linkcode formatDuration()} for trying to format an empty duration. */
export class FormatEmptyDurationError extends FormatDurationError {}
Object.defineProperty(FormatEmptyDurationError.prototype, `name`, { value: `FormatEmptyDurationError` })

/** Error that can be thrown by {@linkcode formatDuration()} for trying to format non-integers. */
export class FormatNonIntegerDurationError extends FormatDurationError {}
Object.defineProperty(FormatEmptyDurationError.prototype, `name`, { value: `FormatEmptyDurationError` })

/** Available options for configuring {@linkcode formatDuration()}. */
type FormatDurationOptions = LaxPartial<{
	/**
	When set to `true`, skips formatting entries that are `0`, as if they were set to
	[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

	@default false
	*/
	hideZero: boolean
}>

/**
Format a {@linkcode Duration} as a [`string`](https://developer.mozilla.org/en-US/docs/Glossary/String).

@param duration The {@linkcode Duration} to be formatted.
@param options The {@linkcode FormatDurationOptions} used to confure how duration gets formatted.
@returns Formatted duration as a [`string`](https://developer.mozilla.org/en-US/docs/Glossary/String).
@throws Throws {@linkcode FormatEmptyDurationError} when given empty duration.
@throws May throw other {@linkcode FormatDurationError} instances.
*/
export const formatDuration = (duration: Duration, options: FormatDurationOptions = {}): string => {
	if (Object.values(duration).some(value => value && !Number.isInteger(value)))
		throw new FormatNonIntegerDurationError(`Duration properties must be set to undefined or integers`)

	const entries: { value: number, unit: string }[] = [
		duration.years != undefined && { value: duration.years, unit: `year` },
		duration.days != undefined && { value: duration.days, unit: `day` },
		duration.hours != undefined && { value: duration.hours, unit: `hour` },
		duration.minutes != undefined && { value: duration.minutes, unit: `minute` },
		duration.seconds != undefined && { value: duration.seconds, unit: `second` },
		duration.milliseconds != undefined && { value: duration.milliseconds, unit: `millisecond` },
	].filter(Boolean)

	if (!entries.length)
		throw new FormatEmptyDurationError(`Cannot format empty duration`)

	if (options.hideZero) {
		const nonZeros = entries.filter(item => item.value)

		if (nonZeros.length)
			return nonZeros.map(item => `${item.value} ${item.unit}${item.value == 1 ? `` : `s`}`).join(`, `)

		return `0 ${entries[0]!.unit}s`
	}

	return entries.map(item => `${item.value} ${item.unit}${item.value == 1 ? `` : `s`}`).join(`, `)
}

if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest

	test(`normalizeDuration() throws for non-integers`, () => {
		expect(() => normalizeDuration({ seconds: 1.5 })).toThrow(NormalizeNonIntegerDurationError)
	})

	test(`formatDuration() does not make empty string`, () => {
		const duration: Duration = { seconds: 0 }

		normalizeDuration(duration)
		expect(formatDuration(duration, { hideZero: true })).toBe(`0 seconds`)
	})

	test(`formatDuration() throws for empty Duration`, () => {
		expect(() => formatDuration({})).toThrow(FormatEmptyDurationError)
	})

	test(`formatDuration() throws for non-integers`, () => {
		expect(() => formatDuration({ seconds: 1.5 })).toThrow(FormatNonIntegerDurationError)
	})
}
