# Samual's Duration Library
Normalize and format durations of time.

[See Docs.](https://jsr.io/@samual/duration/doc)

## Example
```ts
import { type Duration, normalizeDuration, formatDuration } from "@samual/duration"

let duration: Duration = { years: 0, days: 0, hours: 0, milliseconds: Date.now() }

normalizeDuration(duration)
console.log(duration) // { years: 54, days: 349, hours: 11, milliseconds: 2834227 }
duration.milliseconds = undefined
console.log(formatDuration(duration)) // "54 years, 349 days, 11 hours"
```
