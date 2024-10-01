export function getFormattedDate(date) {
    // Check if date is a valid Date object
    if (!(date instanceof Date) || isNaN(date)) {
        return 'Invalid Date';
    }

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}


export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
