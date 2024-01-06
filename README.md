# Day Planner

Daily event/reminder schedule manager.

## Synopsis

This web app provides 24 one hour slots where notes can be saved and associated with a specific time of day. By default it
shows the hours of 9am to 5pm.

## [`DayHourSlot`][day hour slot module]

The `DayHourSlot` class creates objects that represent each hour of the day, rendering them as rows in the viewport. It
does this by combining its JQuery `HTMLElement` properties to compose each row. Each row consists of 3 components:

1. Time of day
1. Text area
1. Save button

Below shows 3 rows and the 3 separate components that make up each row:

![Day planner rows][day planner rows]

When the save button is clicked, the contents of the text area input are saved to local storage overwriting any existing saved data
using the hour row ID as the key for the saved data.

[day hour slot module]: ./src/main/ts/day-hour-slot.ts "day-hour-slot module"
[day planner rows]: ./docs/day_planner_rows.png "Day planner rows breakdown"
