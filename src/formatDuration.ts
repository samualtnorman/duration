import type { LaxPartial } from "@samual/lib"
import { type Duration, DurationError } from "."

/** Error that can be thrown by {@linkcode formatDuration()}. */
export class FormatDurationError extends DurationError {}
Object.defineProperty(FormatDurationError.prototype, `name`, { value: `FormatDurationError` })

/** Error that can be thrown by {@linkcode formatDuration()} for trying to format an empty duration. */
export class FormatEmptyDurationError extends FormatDurationError {}
Object.defineProperty(FormatEmptyDurationError.prototype, `name`, { value: `FormatEmptyDurationError` })

/** Error that can be thrown by {@linkcode formatDuration()} for trying to format non-integers. */
export class FormatNonIntegerDurationError extends FormatDurationError {}
Object.defineProperty(FormatEmptyDurationError.prototype, `name`, { value: `FormatEmptyDurationError` })

/** Available options for configuring {@linkcode formatDuration()}. */
export type FormatDurationOptions = LaxPartial<{
	/**
	When set to `true`, skips formatting entries that are `0`, as if they were set to
	[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

	@default false
	*/
	hideZero: boolean

	/**
	The maximum number of entries to format or has no affect when set to
	[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).
	@default undefined
	*/
	maxEntries: number

	/**
	Override the name of the {@linkcode Duration.years} unit.
	@default "year"
	*/
	yearUnitNameSingular: string

	/**
	Override the plural of the {@linkcode Duration.years} unit.
	@default "years"
	*/
	yearUnitNamePlural: string

	/**
	Override the name of the {@linkcode Duration.days} unit.
	@default "day"
	*/
	dayUnitNameSingular: string

	/**
	Override the plural of the {@linkcode Duration.days} unit.
	@default "days"
	*/
	dayUnitNamePlural: string

	/**
	Override the name of the {@linkcode Duration.hours} unit.
	@default "hour"
	*/
	hourUnitNameSingular: string

	/**
	Override the plural of the {@linkcode Duration.hours} unit.
	@default "hours"
	*/
	hourUnitNamePlural: string

	/**
	Override the name of the {@linkcode Duration.minutes} unit.
	@default "minute"
	*/
	minuteUnitNameSingular: string

	/**
	Override the plural of the {@linkcode Duration.minutes} unit.
	@default "minutes"
	*/
	minuteUnitNamePlural: string

	/**
	Override the name of the {@linkcode Duration.seconds} unit.
	@default "second"
	*/
	secondUnitNameSingular: string

	/**
	Override the plural of the {@linkcode Duration.seconds} unit.
	@default "seconds"
	*/
	secondUnitNamePlural: string

	/**
	Override the name of the {@linkcode Duration.milliseconds} unit.
	@default "millisecond"
	*/
	millisecondUnitNameSingular: string

	/**
	Override the plural of the {@linkcode Duration.milliseconds} unit.
	@default "milliseconds"
	*/
	millisecondUnitNamePlural: string

	/**
	When `false`, a space will be inserted before the unit otherwise won't.
	@default false
	*/
	noSpaceBeforeUnit: boolean
}>

/**
Format a {@linkcode Duration} as a [`string`](https://developer.mozilla.org/en-US/docs/Glossary/String).

@param duration The {@linkcode Duration} to be formatted.
@param options The {@linkcode FormatDurationOptions} used to confure how duration gets formatted.
@returns Formatted duration as a [`string`](https://developer.mozilla.org/en-US/docs/Glossary/String).
@throws Any {@linkcode FormatDurationError}.
@throws A {@linkcode FormatEmptyDurationError} when given empty duration.
@throws A {@linkcode FormatNonIntegerDurationError} when given duration with numbers that aren't integers.
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
