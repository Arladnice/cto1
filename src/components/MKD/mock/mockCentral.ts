export type CentralKpi = {
    totalSignals: number;
    totalParams: number;
    checkablePercent: number; // 0..100
    checkableCount: number;
    disabledPercent: number; // 0..100
    disabledCount: number;
    goodSignalsPercent: number; // 0..100
    goodSignalsCount: number;
    badSignalsPercent: number; // 0..100
    badSignalsCount: number;
};

export type CentralMonth = {
    label: string; // e.g. 'Окт. 2024'
    total: number;
    good: number;
    bad: number;
};

// ----- Моки для правой панели -----
export type GeneralTileItem = {
    name: string;
    percent: number; // 0..100
    count: number;
    color: string;
};

export type GeneralTilesData = {
    parameters: GeneralTileItem[];
    rules: GeneralTileItem[];
};

// Базовые моковые данные
const baseMockData = {
    kpi: {
        totalSignals: 48500,
        totalParams: 32010,
        checkablePercent: 72,
        checkableCount: 32010,
        disabledPercent: 28,
        disabledCount: 16490,
        goodSignalsPercent: 81,
        goodSignalsCount: 39285,
        badSignalsPercent: 19,
        badSignalsCount: 9215,
    },
    months: [
        { label: 'Окт. 2023', total: 3800, good: 3078, bad: 722 },
        { label: 'Ноя. 2023', total: 4200, good: 3402, bad: 798 },
        { label: 'Дек. 2023', total: 3900, good: 3159, bad: 741 },
        { label: 'Янв. 2024', total: 4100, good: 3321, bad: 779 },
        { label: 'Фев. 2024', total: 4000, good: 3240, bad: 760 },
        { label: 'Мар. 2024', total: 4300, good: 3483, bad: 817 },
        { label: 'Апр. 2024', total: 4200, good: 3402, bad: 798 },
        { label: 'Май 2024', total: 4500, good: 3645, bad: 855 },
        { label: 'Июн. 2024', total: 4400, good: 3564, bad: 836 },
        { label: 'Июл. 2024', total: 4600, good: 3726, bad: 874 },
        { label: 'Авг. 2024', total: 4500, good: 3645, bad: 855 },
        { label: 'Сен. 2024', total: 4800, good: 3888, bad: 912 },
    ],
};

// Функция для генерации данных на основе выбранного периода
const generateDataForPeriod = (from: Date, to: Date) => {
    const start = new Date(from);
    const end = new Date(to);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const MS_IN_DAY = 24 * 60 * 60 * 1000;
    const diffInDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / MS_IN_DAY) + 1);

    // Короткий интервал -> по дням
    if (diffInDays <= 31) {
        const days: {
            label: string;
            total: number;
            good: number;
            bad: number;
        }[] = [];
        const cursor = new Date(start);
        while (cursor <= end) {
            const label = cursor.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
            });

            const baseTotal = Math.floor(Math.random() * 150) + 100; // 100..249
            const goodPercent = 0.75 + Math.random() * 0.2; // 75-95%
            const good = Math.round(baseTotal * goodPercent);
            const bad = baseTotal - good;

            days.push({ label, total: baseTotal, good, bad });
            cursor.setDate(cursor.getDate() + 1);
        }

        const totalSignals = days.reduce((sum, d) => sum + d.total, 0);
        const goodSignalsCount = days.reduce((sum, d) => sum + d.good, 0);
        const badSignalsCount = days.reduce((sum, d) => sum + d.bad, 0);
        const totalParams = Math.round(totalSignals * 0.66);
        const checkableCount = Math.round(totalParams * 0.72);
        const disabledCount = totalParams - checkableCount;

        return {
            kpi: {
                totalSignals,
                totalParams,
                checkablePercent: Math.round((checkableCount / totalParams) * 100),
                checkableCount,
                disabledPercent: Math.round((disabledCount / totalParams) * 100),
                disabledCount,
                goodSignalsPercent: Math.round((goodSignalsCount / totalSignals) * 100),
                goodSignalsCount,
                badSignalsPercent: Math.round((badSignalsCount / totalSignals) * 100),
                badSignalsCount,
            },
            months: days,
        };
    }

    // Длинный интервал -> по месяцам
    const months: {
        label: string;
        total: number;
        good: number;
        bad: number;
    }[] = [];
    const current = new Date(start.getFullYear(), start.getMonth(), 1);
    const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);

    while (current <= endMonth) {
        const label = current.toLocaleDateString('ru-RU', {
            month: 'short',
            year: 'numeric',
        });

        const baseTotal = Math.floor(Math.random() * 2000) + 3000; // 3000..4999
        const goodPercent = 0.75 + Math.random() * 0.2; // 75-95%
        const good = Math.round(baseTotal * goodPercent);
        const bad = baseTotal - good;

        months.push({ label, total: baseTotal, good, bad });
        current.setMonth(current.getMonth() + 1);
    }

    const totalSignals = months.reduce((sum, m) => sum + m.total, 0);
    const goodSignalsCount = months.reduce((sum, m) => sum + m.good, 0);
    const badSignalsCount = months.reduce((sum, m) => sum + m.bad, 0);
    const totalParams = Math.round(totalSignals * 0.66);
    const checkableCount = Math.round(totalParams * 0.72);
    const disabledCount = totalParams - checkableCount;

    return {
        kpi: {
            totalSignals,
            totalParams,
            checkablePercent: Math.round((checkableCount / totalParams) * 100),
            checkableCount,
            disabledPercent: Math.round((disabledCount / totalParams) * 100),
            disabledCount,
            goodSignalsPercent: Math.round((goodSignalsCount / totalSignals) * 100),
            goodSignalsCount,
            badSignalsPercent: Math.round((badSignalsCount / totalSignals) * 100),
            badSignalsCount,
        },
        months,
    };
};

// Функция для получения данных на основе выбранного периода
export const getCentralData = (from: Date, to: Date) => {
    return generateDataForPeriod(from, to);
};

// Дефолтные данные (для обратной совместимости)
export const centralKpiMock: CentralKpi = baseMockData.kpi;
export const centralMonthsMock: CentralMonth[] = baseMockData.months;

// Генератор моков для правой панели
const colors = [
    '#006FBA',
    '#1C7B99',
    '#BA8FDB',
    '#BFCED7',
    '#F38B01',
    '#8BD3EF',
    '#F6D77D',
    '#F8A57E',
    '#7DD077',
    '#EB5757',
    '#F67D7F',
];

export const getGeneralTilesData = (seed: number = Date.now()): GeneralTilesData => {
    // простая псевдослучайная функция на основе seed
    let s = seed % 2147483647;
    const rnd = () => (s = (s * 48271) % 2147483647) / 2147483647;

    const makeItems = (prefix: string, count: number): GeneralTileItem[] => {
        return Array.from({ length: count }).map((_, i) => {
            const total = Math.floor(40000 + rnd() * 20000);
            const percent = Math.floor(60 + rnd() * 40); // 60..99
            return {
                name: `${prefix} ${i + 1}`,
                percent,
                count: total,
                color: colors[i % colors.length],
            };
        });
    };

    return {
        parameters: makeItems('Параметр', 15),
        rules: makeItems('Правило', 22),
    };
};

// -------- Downtime mocks --------
export type DowntimePoint = {
    underTwo: number;
    underEight: number;
    underTwentyFour: number;
    underSeven: number;
    moreThenSeven: number;
    date: string;
};

const downtimeColors = ['#006FBA', '#8BD3EF', '#BA8FDB', '#F6D77D', '#F38B01'];

export const getDowntimeSeriesMock = (monthsCount: number = 6, startDate: Date = new Date()): DowntimePoint[] => {
    const series: DowntimePoint[] = [];
    const start = new Date(startDate.getFullYear(), startDate.getMonth() - (monthsCount - 1), 1);

    // simple deterministic generator
    let s = 123456789;
    const rnd = () => (s = (s * 1103515245 + 12345) % 2147483647) / 2147483647;

    for (let i = 0; i < monthsCount; i++) {
        const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
        const base = Math.floor(400 + rnd() * 800); // 400..1199 total
        const u2 = Math.floor(base * (0.45 + rnd() * 0.1));
        const u8 = Math.floor(base * (0.2 + rnd() * 0.08));
        const u24 = Math.floor(base * (0.15 + rnd() * 0.05));
        const u7 = Math.floor(base * (0.1 + rnd() * 0.04));
        let m7 = base - (u2 + u8 + u24 + u7);
        if (m7 < 0) m7 = Math.max(0, Math.floor(base * 0.02));

        series.push({
            underTwo: u2,
            underEight: u8,
            underTwentyFour: u24,
            underSeven: u7,
            moreThenSeven: m7,
            date: d.toISOString(),
        });
    }
    return series;
};

export const getDowntimeTilesData = (seed: number = Date.now()) => {
    // returns 5 tiles with name, color, count, percent
    let s = seed % 2147483647;
    const rnd = () => (s = (s * 48271) % 2147483647) / 2147483647;

    const names = ['До 2 часов', 'До 8 часов', 'До 24 часов', 'До 7 дней', 'Более 7 дней'];
    const counts = names.map(() => Math.floor(10000 + rnd() * 50000));
    const total = counts.reduce((a, b) => a + b, 0);
    const items: GeneralTileItem[] = names.map((name, i) => ({
        name,
        count: counts[i],
        percent: total > 0 ? Math.round((counts[i] / total) * 100) : 0,
        color: downtimeColors[i % downtimeColors.length],
    }));
    return { items, total };
};

export const getDowntimeDonutMock = (seed: number = Date.now()) => {
    const { items, total } = getDowntimeTilesData(seed);
    const data = items.map((i) => i.count);
    const colors = [...downtimeColors, '#ECF0F4']; // add gray tail if needed
    const remainder = Math.max(0, total - data.reduce((a, b) => a + b, 0));
    // Ensure six segments (5 + gray remainder)
    const donutData = remainder > 0 ? [...data, remainder] : [...data, 0];
    return { data: donutData, colors, total };
};
