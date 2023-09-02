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

    const numSet: ReadonlySet<number> = Object.freeze(new Set(numArray));

    if (numSet.size !== numArray.length)
    {
        throw new Error(`${createHoursArray.name}: duplicate values in num array: ${numArray}`);
    }

    return Array.from(numSet).sort((aNum, anotherNum) => aNum - anotherNum);
}

export default createHoursArray;
