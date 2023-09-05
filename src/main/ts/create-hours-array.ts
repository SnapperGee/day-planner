/**
 * @module create-hours-array
 */

/**
 * Takes in an array of numbers and returns a new array based on the passed array formatted to be a valid number range
 * that can be used to create an array of {@link day-hour-slot.DayHourSlot} objects.
 *
 * @param numArray Array of integers to validate and sort.
 *
 * @returns A sorted of array of distinct numbers.
 *
 * @throws {@link RangeError} if any value in the passed array is less than `0` or greater than `23`.
 *
 * @throws {@link Error} if passed array contains non distinct values.
 */
export const createHoursArray = (numArray: number[]): number[] =>
{
    if (numArray.length < 2)
    {
        return numArray;
    }

    let min: number;

    if ((min = Math.min(...numArray)) < 0)
    {
        throw new RangeError(`${createHoursArray.name}: min less than 0: ${min}`);
    }

    let max: number;

    if ((max = Math.max(...numArray)) > 23)
    {
        throw new RangeError(`${createHoursArray.name}: max greater 23: ${min}`);
    }

    if (numArray.some(aNum => numArray.indexOf(aNum) !== numArray.lastIndexOf(aNum)))
    {
        throw new Error(`${createHoursArray.name}: duplicate values in num array: ${numArray}`);
    }

    return Array.from(numArray).sort((aNum, anotherNum) => aNum - anotherNum);
}

export default createHoursArray;
