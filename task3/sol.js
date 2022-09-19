"use strict";

function createCountdown(start) {
    let currentNumber = (typeof(start) !== "number" || !isFinite(start) || start < 0) ? 0 : start + 1;

    let countdownFunc = function() {
        if (currentNumber > 0) currentNumber -= 1;
        return currentNumber;
    };

    return countdownFunc;
}
