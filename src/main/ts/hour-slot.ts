const hourSlotRowClasses: readonly string[] = Object.freeze(["row", "time-block", "past"]);
const timeOfDayColumnClasses: readonly string[] = Object.freeze(["col-2", "col-md-1", "hour", "text-center", "py-3"]);
const textAreaClasses: readonly string[] = Object.freeze(["col-8", "col-md-10", "description"]);
const saveButtonIconClasses: readonly string[] = Object.freeze(["fas", "fa-save"]);
const saveButtonClasses: readonly string[] = Object.freeze(["btn", "saveBtn", "col-2", "col-md-1"]);

const hourToTimeOfDay = (aNum: number): number => (aNum + 9) % 12 || 12;
const hourToTimeOfDayString = (aNum: number): string => `${hourToTimeOfDay(aNum)}${aNum < 3 ? "AM" : "PM"}`;

export const temporalTimeValues = Object.freeze(["past", "present", "future"]);

export const temporalTime = Object.freeze(
    Object.fromEntries(
        Array.from(temporalTimeValues.values()).map(tempTime => [tempTime.toUpperCase(), tempTime])
));

export class HourSlot
{
    readonly #hour: number;
    readonly #id: string;
    readonly #$row: JQuery<HTMLElement>;
    readonly #$timeOfDay: JQuery<HTMLElement>;
    readonly #$textArea: JQuery<HTMLElement>;
    readonly #$saveButton: JQuery<HTMLElement>;

    constructor(hourNum: number)
    {
        if (typeof hourNum !== "number")
        {
            throw new TypeError(`${new.target.name}: non number hourNum: ${hourNum === null ? "null" : hourNum}`);
        }

        if (hourNum < 0 || hourNum > 8)
        {
            throw new RangeError(`${new.target.name}: hourNum not within valid range of 0-8: ${hourNum}`);
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

    get hour(): number { return this.#hour; }
    get id(): string { return this.#id; }
    get $row(): JQuery<HTMLElement> { return this.#$row; }
    get $timeOfDay(): JQuery<HTMLElement> { return this.#$timeOfDay; }
    get $textArea(): JQuery<HTMLElement> { return this.#$textArea; }
    get $saveButton(): JQuery<HTMLElement> { return this.#$saveButton; }

    public setTemporalTime(temporalTime: string | number): HourSlot
    {
        if (typeof temporalTime !== "string" || typeof temporalTime !== "number")
        {
            throw new TypeError(`${this.constructor.name}: ${arguments.callee.name}: non-string and non-number argument: ${temporalTime === null ? "null" : temporalTime}`);
        }

        if (typeof temporalTime === "number")
        {
            if (temporalTime < 0 || temporalTime > 2)
            {
                throw new RangeError(`${this.constructor.name}: ${arguments.callee.name}: number not within valid rang of 0-3: ${temporalTime}`);
            }

            this.#$row.removeClass(Array.from(temporalTimeValues)).addClass(temporalTimeValues[temporalTime]);
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
