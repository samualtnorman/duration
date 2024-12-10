/**
 * Format a {@linkcode Duration} as a [`string`](https://developer.mozilla.org/en-US/docs/Glossary/String).
 *
 * @example
 * ```ts
 * import { formatDuration } from "@samual/duration/formatDuration"
 *
 * console.log(formatDuration({ years: 54, days: 349, hours: 11 })) // "54 years, 349 days, 11 hours"
 * ```
 *
 * @module
 */

import type { LaxPartial } from "@samual/lib"
import { type Duration, DurationError } from "."

/**
 * Error that can be thrown by {@linkcode formatDuration()}.
 *
 * @example
 * ```ts
 * import { formatDuration, FormatDurationError } from "@samual/duration"
 *
 * try {
 * 	return formatDuration(duration)
 * } catch (error) {
 * 	if (error instanceof FormatDurationError) {
 * 		// ...
 * 	} else
 * 		throw error
 * }
 * ```
 */
export class FormatDurationError extends DurationError {}
Object.defineProperty(FormatDurationError.prototype, `name`, { value: `FormatDurationError` })

/**
 * Error that can be thrown by {@linkcode formatDuration()} for trying to format an empty duration.
 *
 * @example
 * ```ts
 * import { formatDuration, FormatEmptyDurationError } from "@samual/duration"
 *
 * try {
 * 	return formatDuration(duration)
 * } catch (error) {
 * 	if (error instanceof FormatEmptyDurationError) {
 * 		// ...
 * 	} else
 * 		throw error
 * }
 * ```
 */
export class FormatEmptyDurationError extends FormatDurationError {}
Object.defineProperty(FormatEmptyDurationError.prototype, `name`, { value: `FormatEmptyDurationError` })

/**
 * Error that can be thrown by {@linkcode formatDuration()} for trying to format non-integers.
 *
 * @example
 * ```ts
 * import { formatDuration, FormatNonIntegerDurationError } from "@samual/duration"
 *
 * try {
 * 	return formatDuration(duration)
 * } catch (error) {
 * 	if (error instanceof FormatNonIntegerDurationError) {
 * 		// ...
 * 	} else
 * 		throw error
 * }
 * ```
 */
export class FormatNonIntegerDurationError extends FormatDurationError {}
Object.defineProperty(FormatEmptyDurationError.prototype, `name`, { value: `FormatEmptyDurationError` })

/**
 * Available options for configuring {@linkcode formatDuration()}.
 *
 * @example
 * ```ts
 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
 *
 * let duration: Duration = { years: 54, days: 349, hours: 11, minutes: 47, seconds: 14, milliseconds: 227 }
 *
 * let options: FormatDurationOptions = {
 * 	hideZero: true,
 * 	maxEntries: 3,
 * 	noSpaceBeforeUnit: true,
 * 	yearUnitNameSingular: `y`,
 * 	yearUnitNamePlural: `y`,
 * 	dayUnitNameSingular: `d`,
 * 	dayUnitNamePlural: `d`,
 * 	hourUnitNameSingular: `h`,
 * 	hourUnitNamePlural: `h`,
 * 	minuteUnitNameSingular: `m`,
 * 	minuteUnitNamePlural: `m`,
 * 	secondUnitNameSingular: `s`,
 * 	secondUnitNamePlural: `s`,
 * 	millisecondUnitNameSingular: `ms`,
 * 	millisecondUnitNamePlural: `ms`
 * }
 *
 * console.log(formatDuration(duration, options)) // "54y, 349d, 11h"
 * ```
 */
export type FormatDurationOptions = LaxPartial<{
	/**
	 * When set to `true`, skips formatting entries that are `0`, as if they were set to
	 * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).
	 *
	 * @default false
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { years: 0, days: 1, hours: 8 }
	 *
	 * console.log(formatDuration(duration)) // "0 years, 1 day, 8 hours"
	 * console.log(formatDuration(duration, { hideZero: true })) // "1 day, 8 hours"
	 * ```
	 */
	hideZero: boolean

	/**
	 * The maximum number of entries to format or has no affect when set to
	 * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).
	 * @default undefined
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { years: 1, days: 2, hours: 3, minutes: 4 }
	 *
	 * console.log(formatDuration(duration)) // "1 year, 2 days, 3 hours, 4 minutes"
	 * console.log(formatDuration(duration, { maxEntries: 3 })) // "1 year, 2 days, 3 hours"
	 * ```
	 */
	maxEntries: number

	/**
	 * Override the name of the {@linkcode Duration.years} unit.
	 * @default "year"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { years: 1 }
	 *
	 * console.log(formatDuration(duration)) // "1 year"
	 * console.log(formatDuration(duration, { yearUnitNameSingular: "y" })) // "1 y"
	 * ```
	 */
	yearUnitNameSingular: string

	/**
	 * Override the plural of the {@linkcode Duration.years} unit.
	 * @default "years"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { years: 2 }
	 *
	 * console.log(formatDuration(duration)) // "2 years"
	 * console.log(formatDuration(duration, { yearUnitNamePlural: "y" })) // "2 y"
	 * ```
	 */
	yearUnitNamePlural: string

	/**
	 * Override the name of the {@linkcode Duration.days} unit.
	 * @default "day"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { days: 1 }
	 *
	 * console.log(formatDuration(duration)) // "1 days"
	 * console.log(formatDuration(duration, { dayUnitNameSingular: "d" })) // "1 d"
	 * ```
	 */
	dayUnitNameSingular: string

	/**
	 * Override the plural of the {@linkcode Duration.days} unit.
	 * @default "days"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { days: 2 }
	 *
	 * console.log(formatDuration(duration)) // "2 days"
	 * console.log(formatDuration(duration, { dayUnitNamePlural: "d" })) // "2 d"
	 * ```
	 */
	dayUnitNamePlural: string

	/**
	 * Override the name of the {@linkcode Duration.hours} unit.
	 * @default "hour"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { hours: 1 }
	 *
	 * console.log(formatDuration(duration)) // "1 hour"
	 * console.log(formatDuration(duration, { hourUnitNameSingular: "h" })) // "1 h"
	 */
	hourUnitNameSingular: string

	/**
	 * Override the plural of the {@linkcode Duration.hours} unit.
	 * @default "hours"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { hours: 2 }
	 *
	 * console.log(formatDuration(duration)) // "2 hours"
	 * console.log(formatDuration(duration, { hourUnitNamePlural: "h" })) // "2 h"
	 * ```
	 */
	hourUnitNamePlural: string

	/**
	 * Override the name of the {@linkcode Duration.minutes} unit.
	 * @default "minute"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { minutes: 1 }
	 *
	 * console.log(formatDuration(duration)) // "1 minute"
	 * console.log(formatDuration(duration, { minuteUnitNameSingular: "m" })) // "1 m"
	 */
	minuteUnitNameSingular: string

	/**
	 * Override the plural of the {@linkcode Duration.minutes} unit.
	 * @default "minutes"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { minutes: 2 }
	 *
	 * console.log(formatDuration(duration)) // "2 minutes"
	 * console.log(formatDuration(duration, { minuteUnitNamePlural: "m" })) // "2 m"
	 * ```
	 */
	minuteUnitNamePlural: string

	/**
	 * Override the name of the {@linkcode Duration.seconds} unit.
	 * @default "second"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { seconds: 1 }
	 *
	 * console.log(formatDuration(duration)) // "1 second"
	 * console.log(formatDuration(duration, { secondUnitNameSingular: "s" })) // "1 s"
	 */
	secondUnitNameSingular: string

	/**
	 * Override the plural of the {@linkcode Duration.seconds} unit.
	 * @default "seconds"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { seconds: 2 }
	 *
	 * console.log(formatDuration(duration)) // "2 seconds"
	 * console.log(formatDuration(duration, { secondUnitNamePlural: "s" })) // "2 s"
	 * ```
	 */
	secondUnitNamePlural: string

	/**
	 * Override the name of the {@linkcode Duration.milliseconds} unit.
	 * @default "millisecond"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { milliseconds: 1 }
	 *
	 * console.log(formatDuration(duration)) // "1 millisecond"
	 * console.log(formatDuration(duration, { millisecondUnitNameSingular: "ms" })) // "1 ms"
	 */
	millisecondUnitNameSingular: string

	/**
	 * Override the plural of the {@linkcode Duration.milliseconds} unit.
	 * @default "milliseconds"
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { milliseconds: 2 }
	 *
	 * console.log(formatDuration(duration)) // "2 milliseconds"
	 * console.log(formatDuration(duration, { millisecondUnitNamePlural: "ms" })) // "2 ms"
	 * ```
	 */
	millisecondUnitNamePlural: string

	/**
	 * When `false`, a space will be inserted before the unit otherwise won't.
	 * @default false
	 *
	 * @example
	 * ```ts
	 * import { formatDuration, type Duration, type FormatDurationOptions } from "@samual/duration"
	 *
	 * let duration: Duration = { milliseconds: 500 }
	 *
	 * console.log(formatDuration(duration, { millisecondUnitNamePlural: "ms" })) // "500 ms"
	 * console.log(formatDuration(duration, { millisecondUnitNamePlural: "ms", noSpaceBeforeUnit: true })) // "500ms"
	 * ```
	 */
	noSpaceBeforeUnit: boolean
}>

/**
 * Format a {@linkcode Duration} as a [`string`](https://developer.mozilla.org/en-US/docs/Glossary/String).
 *
 * @param duration The {@linkcode Duration} to be formatted.
 * @param options The {@linkcode FormatDurationOptions} used to confure how duration gets formatted.
 * @returns Formatted duration as a [`string`](https://developer.mozilla.org/en-US/docs/Glossary/String).
 * @throws Any {@linkcode FormatDurationError}.
 * @throws A {@linkcode FormatEmptyDurationError} when given empty duration.
 * @throws A {@linkcode FormatNonIntegerDurationError} when given duration with numbers that aren't integers.
 *
 * @example
 * ```ts
 * import { formatDuration } from "@samual/duration/formatDuration"
 *
 * console.log(formatDuration({ years: 54, days: 349, hours: 11 })) // "54 years, 349 days, 11 hours"
 * ```
 */
export const formatDuration = (duration: Duration, options: FormatDurationOptions = {}): string => {
	const nonIntegerEntry = Object.entries(duration).find(([ , value ]) => value && !Number.isInteger(value))

	if (nonIntegerEntry)
		throw new FormatNonIntegerDurationError(`Given number must be an integer, got ${nonIntegerEntry[0]}: ${nonIntegerEntry[1]}`)

	const yearUnitNameSingular = options.yearUnitNameSingular ?? `year`
	const yearUnitNamePlural = options.yearUnitNamePlural ?? `years`
	const dayUnitNameSingular = options.dayUnitNameSingular ?? `day`
	const dayUnitNamePlural = options.dayUnitNamePlural ?? `days`
	const hourUnitNameSingular = options.hourUnitNameSingular ?? `hour`
	const hourUnitNamePlural = options.hourUnitNamePlural ?? `hours`
	const minuteUnitNameSingular = options.minuteUnitNameSingular ?? `minute`
	const minuteUnitNamePlural = options.minuteUnitNamePlural ?? `minutes`
	const secondUnitNameSingular = options.secondUnitNameSingular ?? `second`
	const secondUnitNamePlural = options.secondUnitNamePlural ?? `seconds`
	const millisecondUnitNameSingular = options.millisecondUnitNameSingular ?? `millisecond`
	const millisecondUnitNamePlural = options.millisecondUnitNamePlural ?? `milliseconds`

	const entries: { value: number, unit: string }[] = [
		duration.years != undefined &&
			{ value: duration.years, unit: duration.years == 1 ? yearUnitNameSingular : yearUnitNamePlural },
		duration.days != undefined &&
			{ value: duration.days, unit: duration.days == 1 ? dayUnitNameSingular : dayUnitNamePlural },
		duration.hours != undefined &&
			{ value: duration.hours, unit: duration.hours == 1 ? hourUnitNameSingular : hourUnitNamePlural },
		duration.minutes != undefined &&
			{ value: duration.minutes, unit: duration.minutes == 1 ? minuteUnitNameSingular : minuteUnitNamePlural },
		duration.seconds != undefined &&
			{ value: duration.seconds, unit: duration.seconds == 1 ? secondUnitNameSingular : secondUnitNamePlural },
		duration.milliseconds != undefined && {
			value: duration.milliseconds,
			unit: duration.milliseconds == 1 ? millisecondUnitNameSingular : millisecondUnitNamePlural
		},
	].filter(Boolean).slice(0, options.maxEntries)

	if (!entries.length)
		throw new FormatEmptyDurationError(`Cannot format empty duration`)

	if (options.hideZero) {
		const nonZeros = entries.filter(item => item.value)

		if (nonZeros.length)
			return nonZeros.map(item => `${item.value}${options.noSpaceBeforeUnit ? `` : ` `}${item.unit}`).join(`, `)

		return `0 ${entries[0]!.unit}`
	}

	return entries.map(item => `${item.value}${options.noSpaceBeforeUnit ? `` : ` `}${item.unit}`).join(`, `)
}

if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest

	test(`formatDuration() throws for empty Duration`, () => {
		expect(() => formatDuration({})).toThrow(FormatEmptyDurationError)
	})

	test(`formatDuration() throws for non-integers`, () => {
		expect(() => formatDuration({ seconds: 1.5 })).toThrow(FormatNonIntegerDurationError)
	})

	test(`formatDuration() maxEntries: 2`, () => {
		expect(formatDuration({ days: 1, hours: 2, minutes: 3 }, { maxEntries: 2 })).toBe(`1 day, 2 hours`)
	})

	test(`formatDuration() custom unit names`, () => {
		expect(formatDuration({ years: 54, days: 349, hours: 11, minutes: 47, seconds: 14, milliseconds: 227 }, {
			yearUnitNameSingular: `y`,
			yearUnitNamePlural: `y`,
			dayUnitNameSingular: `d`,
			dayUnitNamePlural: `d`,
			hourUnitNameSingular: `h`,
			hourUnitNamePlural: `h`,
			minuteUnitNameSingular: `m`,
			minuteUnitNamePlural: `m`,
			secondUnitNameSingular: `s`,
			secondUnitNamePlural: `s`,
			millisecondUnitNameSingular: `ms`,
			millisecondUnitNamePlural: `ms`
		})).toBe(`54 y, 349 d, 11 h, 47 m, 14 s, 227 ms`)
	})

	test(`formatDuration() custom unit names`, () => {
		expect(formatDuration({ years: 54, days: 349, hours: 11, minutes: 47, seconds: 14, milliseconds: 227 }, {
			yearUnitNameSingular: `y`,
			yearUnitNamePlural: `y`,
			dayUnitNameSingular: `d`,
			dayUnitNamePlural: `d`,
			hourUnitNameSingular: `h`,
			hourUnitNamePlural: `h`,
			minuteUnitNameSingular: `m`,
			minuteUnitNamePlural: `m`,
			secondUnitNameSingular: `s`,
			secondUnitNamePlural: `s`,
			millisecondUnitNameSingular: `ms`,
			millisecondUnitNamePlural: `ms`,
			noSpaceBeforeUnit: true
		})).toBe(`54y, 349d, 11h, 47m, 14s, 227ms`)
	})
}
