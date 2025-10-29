import {getRandomRange} from "@/lib/math.ts";

export const mockCentralTableArrHeader = [
    '№',
    'Месторождение',
    'Параметры',
    'Общее кол-во параметров',
    'Проверяемые параметры',
    'Отключенные параметры',
    'Сигналы',
    'Общее кол-во сигналов',
    'Качественные сигналы',
    'Некачественные сигналы'
]

export const mockCentralTableListGroups = {
    'Месторождение': [ //Месторождение
        'Вынгапуровское',
        'Зимнее',
        'Капитоновское',
        'Романовское',
        'Холмогорское',
        'Тазовское НГКМ',
    ]
};

function getRandomFields(arr: string | any[]) {
    return arr[getRandomRange(0, arr.length - 1, 0)];
}

export function getNewRow(i: number) {
    return {
        id: i + 1,
        'Месторождение': getRandomFields(mockCentralTableListGroups['Месторождение']),
        'Параметры': {prc: getRandomRange(15, 100, 0), total: getRandomRange(5000, 9999, 0)},
        'Общее кол-во параметров': getRandomRange(5000, 9999, 0),
        'Проверяемые параметры': {prc: getRandomRange(0, 100, 0), total: getRandomRange(5000, 9999, 0)},
        'Отключенные параметры': {prc: getRandomRange(0, 100, 0), total: getRandomRange(5000, 9999, 0)},
        'Сигналы': {prc: getRandomRange(15, 100, 0), total: getRandomRange(5000, 9999, 0)},
        'Общее кол-во сигналов': getRandomRange(5000, 9999, 0),
        'Качественные сигналы': {prc: getRandomRange(0, 100, 0), total: getRandomRange(5000, 9999, 0)},
        'Некачественные сигнал': {prc: getRandomRange(0, 100, 0), total: getRandomRange(5000, 9999, 0)},
    }
}

export const mockCentralTableArrTable =
    Array.from({length: 0}, (_, i) => (Object.values(getNewRow(i)))) as [];