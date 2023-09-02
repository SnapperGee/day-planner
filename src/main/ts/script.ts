import { HourSlot, temporalTime } from "./hour-slot";
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

// Day 24 hour based slots to render in DOM
const hours = Object.freeze([9,10,11,12,13,14,15,16,17]);

// Create hour slots and set to past, present, or future colors
const hourSlots = Object.freeze(hours.map(hour => new HourSlot(hour).setTemporalTime(   hour > currentHour ? temporalTime.FUTURE
                                                                                      : currentHour < hour ? temporalTime.PAST
                                                                                      : temporalTime.FUTURE )));

// Retrieve any saved day hour slot text area inputs
const localStorageMap: ReadonlyMap<string, string> = Object.freeze(hourSlots.reduce((map, hourSlot) =>
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
 hourSlots.filter(hourSlot => localStorageMap.has(hourSlot.id)).forEach(hourSlot => hourSlot.$textArea.val(localStorageMap.get(hourSlot.id)!))

$(function () {

    // Display current date in header
    $("#currentDay").text(currentDayString);

    // Rend hour slots to DOM
    hourSlots.forEach(hourSlot => hourSlot.$row.appendTo("body > div"));
});
