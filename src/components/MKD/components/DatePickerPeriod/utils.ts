// useDatePickerPeriod.ts


export const formatDateTime = (date = new Date(), dateTimeFormat = 'dd.mm.yyyy hh:MM:ss'): string => {

    if (!date) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    const syear = year % 100;

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formatMap = {
        'dd': day, 'mm': month, 'yyyy': year, 'yy': syear, 'hh': hours, 'MM': minutes, 'ss': seconds
    };

    return dateTimeFormat.replace(/dd|mm|yyyy|yy|hh|MM|ss/g, match => formatMap[match]);
}

export const splitIntoSubArr = (arr: any[], div: number = 4) =>
    Array.from({length: div}, (_, i) =>
        arr.slice(
            Math.floor(i * arr.length / div),
            Math.floor((i + 1) * arr.length / div)
        )
    );

export const isToday = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

// export const addMonths = (n: number, date: Date) => {
//     const next = new Date(date);
//     next.setMonth(next.getMonth() + n);
//     return next;
// };

export const addYear = (y: number, date?: Date): Date => {
    const next = date ? date : new Date();
    next.setFullYear(next.getFullYear() + y);
    return next;
};

export const addMonths = (n: number, date?: Date): Date => {
    const next = date ? new Date(date) : new Date();
    next.setMonth(next.getMonth() + n);
    return next;
};
export const addDay = (d: number, date?: Date): Date => {
    const next = date ? new Date(date) : new Date();
    next.setDate(next.getDate() + d);
    return next;
};
export const addHour = (h: number, date?: Date): Date => {
    const next = date ? new Date(date) : new Date();
    next.setHours(next.getHours() + h);
    return next;
};
export const addMinute = (m: number, date?: Date): Date => {
    const next = date ? new Date(date) : new Date();
    next.setMinutes(next.getMinutes() + m);
    return next;
};
export const addSecond = (s: number, date?: Date): Date => {
    const next = date ? new Date(date) : new Date();
    next.setSeconds(next.getSeconds() + s);
    return next;
};


export const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

export const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);

export const buildCalendar = (month: Date) => {
    const first = startOfMonth(month);
    const last = endOfMonth(month);

    const startWeekDay = (first.getDay() + 6) % 7; // 0 = понедельник
    const startDate = new Date(first);
    startDate.setDate(startDate.getDate() - startWeekDay);

    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) {
        cells.push(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i));
    }
    return cells;
};