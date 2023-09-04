import { createHoursArray } from "./create-hours-array";
import { DayHourSlot, temporalTime } from "./day-hour-slot";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import $ from "jquery";

dayjs.extend(utc);
dayjs.extend(tz);

// Get current time
const now = dayjs().utc().tz(dayjs.tz.guess());

// Current date to display in header
const currentDayString = now.format("MMMM D, YYYY");

// Current 24 based hour to calculate temporal time (past, present, future) for each day hour slot to color code them
const currentHour = parseFloat(now.format("H"));

// Day 24 hour based slots to render in DOM. These values can be changed ranging anywhere from 0 to 23 to represent 12am
// to 11pm. Passing a number less than 0, greater than 23, or duplicates will cause an error to be thrown.
const hours = Object.freeze(createHoursArray([9,10,11,12,13,14,15,16,17]));

// Create hour slots and set to past, present, or future colors
const dayHourSlots: readonly DayHourSlot[] = Object.freeze(hours.map(dayHour => new DayHourSlot(dayHour).setTemporalTime(dayHour > currentHour ? temporalTime.FUTURE : dayHour < currentHour ? temporalTime.PAST : temporalTime.PRESENT)));

// Retrieve any saved day hour slot text area inputs
const localStorageMap: ReadonlyMap<string, string> = Object.freeze(dayHourSlots.reduce((map, hourSlot) =>
{
    const retrievedVal = localStorage.getItem(hourSlot.id);

    if (retrievedVal !== null)
    {
        map.set(hourSlot.id, retrievedVal);
    }

    return map;
},
 new Map()));

 // Fill text area input of day hour slot with saved data
 dayHourSlots.filter(hourSlot => localStorageMap.has(hourSlot.id)).forEach(hourSlot => hourSlot.$textArea.val(localStorageMap.get(hourSlot.id)!))

$(function () {

    // Display current date in header
    $("#currentDay").text(currentDayString);

    // Rend hour slots to DOM
    dayHourSlots.forEach(hourSlot => hourSlot.$row.appendTo("#dayHourRows"));
});
