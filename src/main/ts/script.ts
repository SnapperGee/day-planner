import { HourSlot, temporalTime } from "./hour-slot";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

const currentHour = parseFloat(dayjs().utc().tz().format("H"));

// Hours slots to render in DOM
const hours = Object.freeze([9,10,11,12,13,14,15,16,17]);

// Create hour slots and set to past, present, or future colors
const hourSlots = Object.freeze(hours.map(hour => new HourSlot(hour).setTemporalTime(   hour > currentHour ? temporalTime.FUTURE
                                                                                      : currentHour < hour ? temporalTime.PAST
                                                                                      : temporalTime.FUTURE )));

$(function () {

    // Rend hour slots to DOM
    hourSlots.forEach(hourSlot => hourSlot.$row.appendTo("body > div"));
});
