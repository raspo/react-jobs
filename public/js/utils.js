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

export default class Utils {
    static simpleDate(datestring) {
        const date = new Date(datestring);
        return months[date.getUTCMonth()] + ' ' + date.getUTCDate();
    }
}
