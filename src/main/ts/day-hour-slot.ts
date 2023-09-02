import $ from "jquery";

const hourSlotRowClasses = Object.freeze(["row", "time-block", "past"]);
const timeOfDayColumnClasses = Object.freeze(["col-2", "col-md-1", "hour", "text-center", "py-3"]);
const textAreaClasses = Object.freeze(["col-8", "col-md-10", "description"]);
const saveButtonIconClasses = Object.freeze(["fas", "fa-save"]);
const saveButtonClasses = Object.freeze(["btn", "saveBtn", "col-2", "col-md-1"]);

const hourToTimeOfDay = (aNum: number): number => aNum === 0 || aNum === 12 ? 12 : aNum % 12;
const hourToTimeOfDayString = (aNum: number): string => `${hourToTimeOfDay(aNum)}${aNum < 12 ? "AM" : "PM"}`;

export const temporalTimeValues: readonly string[] = Object.freeze(["past", "present", "future"]);

export const temporalTime: {readonly [tempTime in typeof temporalTimeValues[number] as Uppercase<tempTime>]: tempTime} = Object.freeze(
    Object.fromEntries(
        Array.from(temporalTimeValues.values()).map(tempTime => [tempTime.toUpperCase(), tempTime])
));

export class DayHourSlot
{
    readonly #hour: number;
    readonly #id: string;
    readonly #$row: JQuery<HTMLElement>;
    readonly #$timeOfDay: JQuery<HTMLElement>;
    readonly #$textArea: JQuery<HTMLElement>;
    readonly #$saveButton: JQuery<HTMLElement>;

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

        this.#hour = hourNum;
        this.#id = `hour-${this.#hour}`;

        this.#$timeOfDay = $("<div>").addClass(Array.from(timeOfDayColumnClasses))
                                     .text(hourToTimeOfDayString(this.#hour));

        const textAreaId = `${this.#id}-textarea-input`;

        const $textAreaLabel = $("<label>").addClass("visually-hidden").attr("for", textAreaId).text(`${this.#id} input`);

        this.#$textArea = $("<textarea>").addClass(Array.from(textAreaClasses))
                                         .attr({id: textAreaId, rows: 3});

        const $saveButtonIcon = $("<i>").addClass(Array.from(saveButtonIconClasses))
                                        .attr("aria-hidden", "true");

        this.#$saveButton = $("<button>").addClass(Array.from(saveButtonClasses))
                                         .attr("aria-label", "save")
                                         .append($saveButtonIcon);

        this.#$saveButton.on("click", () =>
        {
            localStorage.setItem(this.#id, this.#$textArea.val()?.toString() ?? "undefined");
        });

        this.#$row = $("<div>").addClass(Array.from(hourSlotRowClasses))
                               .prop("id", this.#id)
                               .append(this.#$timeOfDay, $textAreaLabel, this.#$textArea, this.#$saveButton);
    }

    public get hour(): number { return this.#hour; }
    public get id(): string { return this.#id; }
    public get $row(): JQuery<HTMLElement> { return this.#$row; }
    public get $timeOfDay(): JQuery<HTMLElement> { return this.#$timeOfDay; }
    public get $textArea(): JQuery<HTMLElement> { return this.#$textArea; }
    public get $saveButton(): JQuery<HTMLElement> { return this.#$saveButton; }

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
                throw new Error(`${this.constructor.name}: ${arguments.callee.name}: argument must be either ${temporalTimeValues.map(t => `"${t}"`).join(", ")}: "${temporalTime}"`);
            }

            this.#$row.removeClass(Array.from(temporalTimeValues)).addClass(temporalTime);
        }

        return this;
    }
}

export default DayHourSlot;
