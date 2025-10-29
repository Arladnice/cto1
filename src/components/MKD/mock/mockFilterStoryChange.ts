import {getRandomRange} from "@/lib/math.ts";

export const mockFilterStoryChangeArrHeader = [
    'Изменение',
    'Дата и время изменения',
    'ФИО',
    'Коментарий'
]

export const mockFilterStoryChangeGroups = {
    'Изменение': [
        'Добавлено 10 параметров',
        'Изменение 3 параметров',
        'Удалено 4 параметра',
    ],
    'ФИО': [
        'Иванов И.И.',
        'Петров П.И',
        'Смирнов А.Ф.',
        'Комаров П.С.',
    ],
    'Дата и время изменения': [
        '18.01.2025 13:12:00 ',
        '17.02.2025 12:13:00 ',
        '16.03.2025 11:14:00 ',
        '15.04.2025 10:15:00 ',
    ],
    'Коментарий': [
        'Комментарий, который ввел пользователь при редактировании фильтра',
        'Новые требования',
        'Изменился регламент',
        'Временные изменения',
    ]
};

function getRandomFields(arr: any[]) {
    return arr[getRandomRange(0, arr.length - 1, 0)];
}

export const mockFilterStoryChangeArrTable =
    Array.from({length: 34}, () => (Object.values({
        'Изменение': getRandomFields(mockFilterStoryChangeGroups['Изменение']),
        'Дата и время изменения': getRandomFields(mockFilterStoryChangeGroups['Дата и время изменения']),
        'ФИО': getRandomFields(mockFilterStoryChangeGroups['ФИО']),
        'Коментарий': getRandomFields(mockFilterStoryChangeGroups['Коментарий']),
    }))) as [];