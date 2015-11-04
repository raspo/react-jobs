const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
];

export function simpleDate(datestring) {
    const date = new Date(datestring);
    return months[date.getUTCMonth()] + ' ' + date.getUTCDate();
}

export function stringScore(string, target) {
    if (string === target) { return 1; }
    if (target === '') { return 0; }

    const lString = string.toLowerCase();
    const strLength = string.length;
    const lTarget = target.toLowerCase();
    const targetLength = target.length;

    let runningScore = 0;
    let charScore;
    let finalScore;
    let idxOf;
    let startAt = 0;
    let i;

    for (i = 0; i < targetLength; i += 1) {
        idxOf = lString.indexOf(lTarget[i], startAt);
        if (idxOf === -1) { return 0; }

        if (startAt === idxOf) {
            charScore = 0.7;
        } else {
            charScore = 0.1;
            if (string[idxOf - 1] === ' ') { charScore += 0.8; }
        }
        if (string[idxOf] === string[i]) { charScore += 0.1; }

        runningScore += charScore;
        startAt = idxOf + 1;
    }

    finalScore = 0.5 * (runningScore / strLength + runningScore / targetLength);

    if ((lTarget[0] === lString[0]) && (finalScore < 0.85)) {
        finalScore += 0.15;
    }

    return finalScore;
}