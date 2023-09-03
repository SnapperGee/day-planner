# Day Planer

Daily event/reminder schedule manager.

## Synopsis

This web app provides 24 one hour slots where notes can be saved associated with a specific time of day. By default it
shows the hours of 9am to 5pm.

## [`DayHourSlot`][day hour slot module]

The `DayHourSlot` class creates an object used to create the rows of each hour of the day rendered to the viewport. It
does this by combining its JQuery `HTMLElement` properties to compose each row. Each row consists of 3 components:

1. Time of day
1. Text area
1. Save button

Below shows 3 rows and the 3 separate components that make up each row:

![Day planner rows][day planner rows]

### `DayHourSlot` constructor

A `number` ranging from `0` to `23` represents the "first" hour of the day (12am) all the way to the "last" hour fo the
day (11pm). Providing a value less than 0 or greater than 23, a non-integer value, or `undefined`/`null` causes an error
to be thrown.

```typescript
// Creates a day hour slot for the first hour of the day, 12am
const midnight = new DayHourSlot(0);

// Creates a day hour slot for 4pm
const fourPM = new DayHourSlot(16);

// Creates a day hour slot for the last hour of the day, 11pm
const midnight = new DayHourSlot(23);

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

The `hour` property is the hour slot of a 24 hour day they represent. For instance, midnight/12am, is the hour `0` and
4pm is the hour `16`.

- `id`

The `id` property is the value used as their id attribute/property in the DOM. This consists a string that is their
`hour` prepended with `"hour-"`. So the `id` for 12am/midnight would be the string `"hour-0"` and the `id` for 4pm would
be `"hour-16"`.

- `$row`

The `$row` property contains the JQuery `HTMLElement` object that is the root parent bootstrap row that encapsulates all
the other JQuery `HTMLElement`s to be rendered to the viewport.

- `$timeOfDay`

The `$timeOfDay` property contains the 12 hour based time

[day hour slot module]: ./src/main/ts/day-hour-slot.ts "day-hour-slot module"
[day planner rows]: ./docs/day_planner_rows.png "Day planner rows breakdown"
