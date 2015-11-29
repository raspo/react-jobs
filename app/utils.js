const monthsCompact = [
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

export const months = [
    { num: '01', name: 'January' },
    { num: '02', name: 'February' },
    { num: '03', name: 'March' },
    { num: '04', name: 'April' },
    { num: '05', name: 'May' },
    { num: '06', name: 'June' },
    { num: '07', name: 'July' },
    { num: '08', name: 'August' },
    { num: '09', name: 'September' },
    { num: '10', name: 'October' },
    { num: '11', name: 'November' },
    { num: '12', name: 'December' }
];

export const jobTypesMap = {
    fulltime: 'Full Time',
    contract: 'Contract',
    freelance: 'Freelance'
};

export const pricingMap = {
    base: {
        cost: 99,
        duration: 30
    },
    extended: {
        cost: 149,
        duration: 60
    },
    premium: {
        cost: 199,
        duration: 90
    }
};

export function simpleDate(datestring) {
    const date = new Date(datestring);
    if (!date || !date.getTime()) { return '--'; }
    return monthsCompact[date.getUTCMonth()] + ' ' + date.getUTCDate();
}

export function prettyJobType(jobType) {
    return jobTypesMap[jobType];
}

export function getCardYears() {
    const years = [];
    let year = new Date().getFullYear();
    let i = 15;
    while (i > 0) {
        years.push(year);
        year += 1;
        i -= 1;
    }
    return years;
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

export function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    }

    const error = new Error(res.statusText);
    error.res = res;
    throw error;
}

export function absoluteURL(resource) {
    return `${window.location.protocol}//${window.location.host}${resource}`;
}
