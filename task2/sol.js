function sumExcept(array, start, count) {
    if (start < 0) start = 0;
    if (count < 0) count = 0;

    array.splice(start, count);

    return array.reduce((sum, value) => {
        debugger;
        if (typeof(value) !== "number") return sum;
        if (!Number.isInteger(value)) return sum;
        return sum + value;
    }, 0);
};
