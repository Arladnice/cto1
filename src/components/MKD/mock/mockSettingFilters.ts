import {getRandomRange} from "@/lib/math.ts";

export const mockSettingsArrHeader = [
    '',
    'Название фильтра',
    'Правило',
    'Источник данных',
    'Дата последнего изменения',
    'ФИО',
    'Статус',
    'Минимум',
    'Максимум',
]

export const mockSettingsListGroups = {
    'Название фильтра': [
        'Фильтр - 1',
        'Фильтр - 2',
        'Фильтр - 3',
        'Фильтр - 4',
        'Фильтр - 5',
        'Фильтр - 6'
    ],
    'Правило': [
        'Полнота поставки',
        'Статус поверки средства измерения',
        'Достоверный диапазон сигнала',
        'Состояние технологического оборудования',
        'Последовательность состояния сигнала. Состояние кожуха',
        'Последовательность состояния сигнала. Запорно-регулирующая аппаратура',
        'Последовательность состояния сигнала. Системы газового анализа',
        'Потеря сигнала',
        'Соблюдение интервалов',
    ],
    'Источник данных': [
        'Ручной ввод',
        'АСУ ТП',
        'МУС АСОПИ'
    ],
    'Дата последнего изменения': [
        '18.01.2025 13:12:00 ',
        '17.02.2025 12:13:00 ',
        '16.03.2025 11:14:00 ',
        '15.04.2025 10:15:00 ',
    ],
    'ФИО': [
        'Иванов И.И.',
        'Петров П.И',
        'Смирнов А.Ф.',
        'Комаров П.С.',
    ]
};

const getRandomFields = (arr: string | any[]) => arr[getRandomRange(0, arr.length - 1, 0)];

export const mockSettingsArrTable =
    Array.from({length: 22}, () => (Object.values({
        check: false,
        'Название фильтра': getRandomFields(mockSettingsListGroups['Название фильтра']),
        'Правило': getRandomFields(mockSettingsListGroups['Правило']),
        'Источник данных': getRandomFields(mockSettingsListGroups['Источник данных']),
        'Дата последнего изменения': getRandomFields(mockSettingsListGroups['Дата последнего изменения']),
        'ФИО': getRandomFields(mockSettingsListGroups['ФИО']),
        statusActivated: !(getRandomRange(0, 2, 0) < 1),
        'Минимум': getRandomRange(-100, 200, 2),
        'Максимум': getRandomRange(-100, 200, 2),
    }))) as [];