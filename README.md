# Day Planer

Daily event/reminder schedule manager.

## Synopsis

This web app provides 24 one hour slots where notes can be saved associated with a specific time of day. By default it
shows the hours of 9am to 5pm.

## [`DayHourSlot`][day hour slot class]

The `DayHourSlot` class contains most of the functionality of this web app. It creates the objects that create each row
for each hour of the day.

### `DayHourSlot` constructor

A `number` ranging from `0` to `23` represents the "first" hour of the day (12am) all the way to the "last" hour fo the
day (11pm). Providing a value less than 0 or greater than 23, a non-integer value, or `undefined`/`null` causes an error
to be thrown.

```typescript
// Creates a day hour slot for 4pm
const fourPM = new DayHourSlot(16);

// All the following statements result in an error to be thrown:
const noUndefined = new DayHourSlot(undefined);
const noNull = new DayHourSlot(null);
const noLessThan0 = new DayHourSlot(-1);
const noGreaterThan23 = new DayHourSlot(42);
const noNonInteger = new DayHourSlot(7.77);
```

### `DayHourSlot` properties

`DayHourSlot` objects contain 6 properties and 1 method.

- `hour`

Their `hour` property is the hour slot of a 24 hour day they represent. For instance, midnight/12am, is the hour `0` and
4pm is the hour `16`.

- `id`

Their `id` property is the value used as their id attribute/property in the DOM. This consists a string that is their
`hour` prepended with `"hour-"`. So the `id` for 12am/midnight would be the string `"hour-0"` and the `id` for 4pm would
be `"hour-16"`.

[day hour slot class]: ./src/main/ts/day-hour-slot.ts
