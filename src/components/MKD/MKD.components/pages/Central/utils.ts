// Функция для обновления данных с анимацией загрузки
export const formatDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Утилиты форматирования
export const formatNumber = (x: string | number | null | undefined) => {
    if (x === null || x === undefined) return '0';
    const str = String(x);
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Палитра для тайлов
export const TILES_COLORS = [
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
] as const;

// Константы для ширины колонок таблицы
export const TABLE_COLUMN_WIDTHS = [
    'minmax(32px, 1fr)',
    'minmax(285px, 1fr)',
    '160px',
    '205px',
    '205px',
    '205px',
    '160px',
    '205px',
    '205px',
    '205px',
] as const;

export const REPORT_TABLE_COLUMN_WIDTHS = [
    'minmax(32px, 1fr)', // №
    '237px', // Цех / Кластер
    '237px', // Месторождение
    '237px', // Объект
    '237px', // Датчик
    '237px', // Уровень критичности
    '130px', // До 2 часов
    '130px', // До 8 часов
    '130px', // До 24 часов
    '130px', // До 7 дней
    '130px', // Более 7 дней
];

// Заголовок для тайлов по режиму
import { INDICATORS_MODE } from '../../../stores/slices/centralChartsSlice.ts';
export const tilesTitle = (mode: INDICATORS_MODE) =>
    mode === INDICATORS_MODE.Parameters ? 'ОБЩИЕ ПОКАЗАТЕЛИ ПО ПАРАМЕТРАМ' : 'ОБЩИЕ ПОКАЗАТЕЛИ ПО ПРАВИЛАМ';

// Построение элементов для GeneralTiles
export interface TileStatItem {
    name: string;
    percentage: number;
    good: number;
}
export const mapTilesToItems = (tiles: Array<TileStatItem>) =>
    tiles.map((t, idx) => ({
        name: t.name,
        percent: Math.round(t.percentage),
        count: t.good,
        color: TILES_COLORS[idx % TILES_COLORS.length],
    }));

// Построение строк таблицы из fieldStats
export interface ProgressCell {
    prc: number;
    total: number;
}
export type TableRow = [
    number,
    string,
    ProgressCell,
    number,
    ProgressCell,
    ProgressCell,
    ProgressCell,
    number,
    ProgressCell,
    ProgressCell,
];

import type { FieldStatDto } from '@/api/generated';
export const buildRowsFromFieldStats = (fieldStats: Array<FieldStatDto>): TableRow[] => {
    if (!Array.isArray(fieldStats)) return [];
    return fieldStats.map((fs, index): TableRow => {
        const sumParams = fs.sumParam ?? 0;
        const checkedPercent = fs.filterPercent ?? 0;
        const disabledPercent = fs.withoutFilterPercent ?? 0;
        const checkedCount = fs.distinctParamFiltered ?? 0;
        const disabledCount = Math.max(0, (fs.sumParam ?? 0) - (fs.distinctParamFiltered ?? 0));

        const signalsTotal = fs.sum ?? 0;
        const goodCount = fs.good ?? 0;
        const badCount = fs.bad ?? 0;
        const goodPercent = fs.goodPercent ?? 0;
        const badPercent = fs.badPercent ?? 0;

        return [
            index + 1,
            fs.groupName ?? '',
            { prc: Math.round(checkedPercent), total: sumParams },
            sumParams,
            { prc: Math.round(checkedPercent), total: checkedCount },
            { prc: Math.round(disabledPercent), total: disabledCount },
            { prc: Math.round(badPercent), total: signalsTotal },
            signalsTotal,
            { prc: Math.round(goodPercent), total: goodCount },
            { prc: Math.round(badPercent), total: badCount },
        ];
    });
};
