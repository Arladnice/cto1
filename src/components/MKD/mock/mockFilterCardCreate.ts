import {getRandomRange} from "@/lib/math.ts";

export const mockFilterCardCreateArrHeader = [
    '',
    'Месторождение',
    'Объект',
    'Участок',
    'Технологическая позиция',
    'Тех. позиция согласно проекта',
    'Параметр'
]

export const mockFilterCardCreateListGroups = {
    'Месторождение': [
        'Вынгапуровское',
        'Зимнее',
        'Капитоновское',
        'Романовское',
        'Холмогорское',
        'Тазовское НГКМ',
    ],
    'Объект': [
        '[ОБ] УКПГ-ЗС ЛСУ УДХ',
        '[ОБ] НГКМ-Н ШМР',
        '[ОБ] ВКН СМР',
        '[ОБ] МНГ ЗПО',
    ],
    'Технологическая позиция': [
        '[ТПоз] УКПГ-ЗС ЛСУ УДХ',
        '[ТПоз] НГКМ-Н ШМР',
        '[ТПоз] ВКН СМР',
        '[ТПоз] МНГ ЗПО',
    ],
    'Тех. позиция согласно проекта': [
        'Групповое',
        'Индивидуальное',
        'Реализованное',
        'Завершение',
    ],
    'Параметр': [
        'Буферное давление',
        'Расход в коллекторе',
        'Температура затрубная',
        'Температура кожуха',
    ]
};

function getRandomFields(arr: any[]) {
    return arr[getRandomRange(0, arr.length - 1, 0)];
}

export const mockFilterCardCreateArrTable =
    Array.from({length: 22}, () => (Object.values({
        check: false,
        'Месторождение': getRandomFields(mockFilterCardCreateListGroups['Месторождение']),
        'Объект': getRandomFields(mockFilterCardCreateListGroups['Объект']),
        'Технологическая позиция': getRandomFields(mockFilterCardCreateListGroups['Технологическая позиция']),
        'Тех. позиция согласно проекта': getRandomFields(mockFilterCardCreateListGroups['Тех. позиция согласно проекта']),
        'Параметр': getRandomFields(mockFilterCardCreateListGroups['Параметр']),
    }))) as [];