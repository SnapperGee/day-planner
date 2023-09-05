/**
 * This module contains the {@link DayHourSlot} class responsible for making objects used to create the hour rows
 * rendered to the viewport. This module also exports some other components this class uses internally and can aid with
 * interacting with it.
 *
 * @module day-hour-slot
 */

import $ from "jquery";

const hourSlotRowClasses = Object.freeze(["row", "time-block", "past"]);
const timeOfDayColumnClasses = Object.freeze(["col-2", "col-md-1", "hour", "text-center", "py-3"]);
const textAreaClasses = Object.freeze(["col-8", "col-md-10", "description"]);
const saveButtonIconClasses = Object.freeze(["fas", "fa-save"]);
const saveButtonClasses = Object.freeze(["btn", "saveBtn", "col-2", "col-md-1"]);

const hourToTimeOfDay = (aNum: number): number => aNum === 0 || aNum === 12 ? 12 : aNum % 12;
const hourToTimeOfDayString = (aNum: number): string => `${hourToTimeOfDay(aNum)}${aNum < 12 ? "AM" : "PM"}`;

/**
 * Contains `string`s for the 3 temporal times `"past"`, `"present"`, and `"future"`. These values are used to set
 * whether a {@link DayHourSlot} object is in the past, present, or future relative to the current hour.
 */
export const temporalTimeValues: readonly string[] = Object.freeze(["past", "present", "future"]);

/**
 * Contains an object that can be used to access the 3 temporal times `"past"`, `"present"`, and `"future"` stored in
 * the {@link temporalTimeValues} array. These values are used to set whether a {@link DayHourSlot} object is in the
 * past, present, or future relative to the current hour.
 */
export const temporalTime: {readonly [tempTime in typeof temporalTimeValues[number] as Uppercase<tempTime>]: tempTime} = Object.freeze(
    Object.fromEntries(
        Array.from(temporalTimeValues.values()).map(tempTime => [tempTime.toUpperCase(), tempTime])
));

/**
 * This class is used to create objects for the hour rows rendered to the viewport. A singe integer `number` argument
 * is used to dictate what hour of the day the rendered row is to represent. For instance, passing `0` results in a row
 * being created for the first hour of the day (12am/midnight) and `23` results in a row being created for last hour of
 * the day (11pm).
 *
 * @example
 * ```typescript
 * // Creates a day hour slot for the first hour of the day, 12am
 * const midnight = new DayHourSlot(0);
 *
 * // Creates a day hour slot for 4pm
 * const fourPM = new DayHourSlot(16);
 *
 * // Creates a day hour slot for the last hour of the day, 11pm
 * const midnight = new DayHourSlot(23);
 *
 * // All the following statements result in an error to be thrown:
 * const noUndefined = new DayHourSlot(undefined);
 * const noNull = new DayHourSlot(null);
 * const noLessThan0 = new DayHourSlot(-1);
 * const noGreaterThan23 = new DayHourSlot(42);
 * const noNonInteger = new DayHourSlot(7.77);
 * ```
 */
export class DayHourSlot
{
    readonly #hour: number;
    readonly #id: string;
    readonly #$row: JQuery<HTMLElement>;
    readonly #$timeOfDay: JQuery<HTMLElement>;
    readonly #$textArea: JQuery<HTMLElement>;
    readonly #$saveButton: JQuery<HTMLElement>;

    /**
     * Constructs an object instance used to create the hour rows rendered to the viewport. A singe integer `number`
     * argument is used to dictate what hour of the day the rendered row is to represent.
     *
     * @param hourNum A `number` ranging from `0` to `23` to set which our of the day the constructed object is for.
     *
     * @throws {@link TypeError} if the passed `hourNum` argument is not an integer.
     *
     * @throws {@link RangeError} if the passed `hourNum` argument is not inclusively between `0` and `23`.
     */
    public constructor(hourNum: NonNullable<number>)
    {
        if (typeof hourNum !== "number")
        {
            throw new TypeError(`${new.target.name}: non number hourNum: ${hourNum === null ? "null" : hourNum}`);
        }

        if (hourNum < 0 || hourNum > 23)
        {
            throw new RangeError(`${new.target.name}: hourNum not within valid range of 0-23: ${hourNum}`);
        }

        if ( ! Number.isInteger(hourNum))
        {
            throw new TypeError(`${new.target.name}: non integer hourNum: ${hourNum}`);
        }

        this.#hour = hourNum;
        this.#id = `hour-${this.#hour}`;

        this.#$timeOfDay = $("<div>").addClass(Array.from(timeOfDayColumnClasses))
                                     .text(hourToTimeOfDayString(this.#hour));

        const textAreaId = `${this.#id}-textarea-input`;

        const $textAreaLabel = $("<label>").addClass("visually-hidden").attr("for", textAreaId).text(`${this.#id} input`);

        this.#$textArea = $("<textarea>").addClass(Array.from(textAreaClasses))
                                         .prop({id: textAreaId, rows: 3});

        const $saveButtonIcon = $("<i>").addClass(Array.from(saveButtonIconClasses))
                                        .prop("aria-hidden", "true");

        this.#$saveButton = $("<button>").addClass(Array.from(saveButtonClasses))
                                         .prop("aria-label", "save")
                                         .append($saveButtonIcon);

        this.#$saveButton.on("click", () =>
        {
            const textAreaInput = this.#$textArea.val()!.toString();

            if (textAreaInput.length === 0)
            {
                localStorage.removeItem(this.#id);
            }
            else
            {
                localStorage.setItem(this.#id, textAreaInput);
            }

        });

        this.#$row = $("<div>").addClass(Array.from(hourSlotRowClasses))
                               .prop("id", this.#id)
                               .append(this.#$timeOfDay, $textAreaLabel, this.#$textArea, this.#$saveButton);
    }

    /**
     * Which hour of a 24 hour day this {@link DayHourSlot} represents. For instance, midnight/12am, is the hour `0` and
     * 4pm is the hour `16`.
     */
    public get hour(): number { return this.#hour; }

    /**
     * The attribute/property used to identify this {@link DayHourSlot} in the DOM. This consists of a `string` that is
     * the {@link DayHourSlot.hour hour} prepended with `"hour-"`. So the `id` for 12am/midnight would be the string
     * `"hour-0"` and the `id` for 4pm would be `"hour-16"`.
     */
    public get id(): string { return this.#id; }

    /**
     * The root JQuery `HTMLElement` bootstrap row to be rendered to the viewport. This is the root parent that contains
     * all the other JQuery `HTMLElement` components of this {@link DayHourSlot} object found in its properties:
     *
     * - {@link DayHourSlot.$timeOfDay $timeOfDay}
     * - {@link DayHourSlot.$textArea $textArea}
     * - {@link DayHourSlot.$saveButton $saveButton}
     */
    public get $row(): JQuery<HTMLElement> { return this.#$row; }

    /**
     * The JQuery `HTMLElement` used to render the time of day tab the left of the text input area denoting which hour
     * of the day the hour row is for. For instance, if this {@link DayHourSlot} object is for hour `14`, the time of
     * day will contain the text `"12PM"`.
     */
    public get $timeOfDay(): JQuery<HTMLElement> { return this.#$timeOfDay; }

    /**
     * The JQuery `HTMLElement` used to render the text area input to save the text associated with this hour of the day
     * that gets saved to local storage when the save button is clicked.
     */
    public get $textArea(): JQuery<HTMLElement> { return this.#$textArea; }

    /**
     * The JQuery `HTMLElement` used to render the save button to the right of the text area input that saves the
     * contents of the text area into local storage.
     */
    public get $saveButton(): JQuery<HTMLElement> { return this.#$saveButton; }

    /**
     * This method adds the class `past`, `present`, or `future` to this {@link DayHourSlot} object's
     * {@link DayHourSlot.$row $row} which dictates the background color of its text input area that gets rendered to
     * the viewport.
     *
     * @param temporalTime Value indicating whether the hour this {@link DayHourSlot} object is for is in the past,
     *                     present, or future. It can be a `string` with the values `"past"`, `"present"`, or `"future"`
     *                     or a `number` where any negative value is considered past, `0` is considered present, and any
     *                     value greater than `0` is considered future.
     *
     * @returns this {@link DayHourSlot} object instance.
     *
     * @throws {@link TypeError} if the passed argument isn't a `string` or `number`.
     */
    public setTemporalTime(temporalTime: NonNullable<string | number>): DayHourSlot
    {
        if (typeof temporalTime !== "string" && typeof temporalTime !== "number")
        {
            throw new TypeError(`${this.constructor.name}: ${arguments.callee.name}: non-string and non-number argument: ${temporalTime === null ? "null" : temporalTime}`);
        }

        if (typeof temporalTime === "number")
        {
            this.#$row.removeClass(Array.from(temporalTimeValues)).addClass(temporalTimeValues[temporalTime < 0 ? 0 : temporalTime > 0 ? 2 : 0]);
        }
        else
        {
            if ( ! temporalTimeValues.includes(temporalTime))
            {
                throw new Error(`${this.constructor.name}: ${arguments.callee.name}: argument must be ${temporalTimeValues.map(t => `"${t}"`).join(", ")}: "${temporalTime}"`);
            }

            this.#$row.removeClass(Array.from(temporalTimeValues)).addClass(temporalTime);
        }

        return this;
    }
}

export default DayHourSlot;
