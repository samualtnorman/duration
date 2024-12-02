import type { LaxPartial } from "@samual/lib"

export type Duration =
	LaxPartial<{ years: number, days: number, hours: number, minutes: number, seconds: number, milliseconds: number }>

export const Duration = ({ years, days, hours, minutes, seconds, milliseconds }: Partial<Duration>): Duration =>
	({ years, days, hours, minutes, seconds, milliseconds })

export function normalizeDuration(duration: Duration): void {
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

export class FormatDurationError extends Error {}
Object.defineProperty(FormatDurationError.prototype, `name`, { value: `FormatDurationError` })

export class FormatEmptyDurationError extends FormatDurationError {}
Object.defineProperty(FormatEmptyDurationError.prototype, `name`, { value: `FormatEmptyDurationError` })

type FormatDurationOptions = LaxPartial<{ ignoreZero: boolean }>

export const formatDuration = (
	{ years, days, hours, minutes, seconds, milliseconds }: Duration, { ignoreZero = false }: FormatDurationOptions = {}
): string => {
	const entries: { value: number, unit: string }[] = [
		years != undefined && { value: years, unit: `year` },
		days != undefined && { value: days, unit: `day` },
		hours != undefined && { value: hours, unit: `hour` },
		minutes != undefined && { value: minutes, unit: `minute` },
		seconds != undefined && { value: seconds, unit: `second` },
		milliseconds != undefined && { value: milliseconds, unit: `millisecond` },
	].filter(Boolean)

	if (ignoreZero) {
		const nonZeros = entries.filter(item => item.value)

		if (nonZeros.length)
			return nonZeros.map(item => `${item.value} ${item.unit}${item.value == 1 ? `` : `s`}`).join(`, `)

		return `0 ${entries[0].unit}s`
	}

	return entries.map(item => `${item.value} ${item.unit}${item.value == 1 ? `` : `s`}`).join(`, `)
}

if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest

	test(`formatDuration() does not make empty string`, () => {
		const duration = Duration({ seconds: 0 })

		normalizeDuration(duration)

		expect(formatDuration(duration, { ignoreZero: true })).toBe(`0 seconds`)
	})

	test(`formatDuration() throws for empty Duration`, () => {
		expect(() => formatDuration({})).toThrow(FormatEmptyDurationError)
	})
}
