import React, { useMemo } from 'react';
import { BarChart } from './Bar.tsx';

interface ChartSectionProps {
    monthsSeries?: { good: number; bad: number; date: string }[];
    // downtime mode
    downtimeSeries?: {
        underTwo: number;
        underEight: number;
        underTwentyFour: number;
        underSeven: number;
        moreThenSeven: number;
        date: string;
    }[];
    // generic mode
    labels?: string[];
    series?: { label: string; data: number[]; color: string }[];
    totalData?: number[];
    title?: string;
    loading?: boolean;
}

export const ChartSection: React.FC<ChartSectionProps> = ({
    monthsSeries,
    downtimeSeries,
    labels: labelsProp,
    series,
    totalData: totalDataProp,
    title = '',
    loading = false,
}) => {
    const { labels, goodData, badData, totalData, seriesOut } = useMemo(() => {
        if (series && labelsProp) {
            const totals = labelsProp.map((_, i) => series.reduce((s, d) => s + (d.data[i] ?? 0), 0));
            return {
                labels: labelsProp,
                goodData: undefined,
                badData: undefined,
                totalData: totalDataProp ?? totals,
                seriesOut: series,
            };
        }

        if (downtimeSeries) {
            const labels = downtimeSeries.map(({ date }) =>
                new Date(date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
            );
            const seriesLabels = ['До 2 часов', 'До 8 часов', 'До 24 часов', 'До 7 дней', 'Более 7 дней'];
            const colors = ['#006FBA', '#8BD3EF', '#BA8FDB', '#F6D77D', '#F38B01'];

            const downtimeData = [
                downtimeSeries.map(({ underTwo }) => underTwo ?? 0),
                downtimeSeries.map(({ underEight }) => underEight ?? 0),
                downtimeSeries.map(({ underTwentyFour }) => underTwentyFour ?? 0),
                downtimeSeries.map(({ underSeven }) => underSeven ?? 0),
                downtimeSeries.map(({ moreThenSeven }) => moreThenSeven ?? 0),
            ];

            const seriesOut = seriesLabels.map((label, i) => ({
                label,
                data: downtimeData[i],
                color: colors[i],
            }));

            const totalData = labels.map((_, i) => downtimeData.reduce((sum, arr) => sum + (arr[i] ?? 0), 0));

            return { labels, goodData: undefined, badData: undefined, totalData, seriesOut };
        }

        const labels = (monthsSeries ?? []).map(({ date }) =>
            new Date(date).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
        );
        const goodData = (monthsSeries ?? []).map(({ good }) => good ?? 0);
        const badData = (monthsSeries ?? []).map(({ bad }) => bad ?? 0);
        const totalData = (monthsSeries ?? []).map(({ good, bad }) => (good ?? 0) + (bad ?? 0));
        return { labels, goodData, badData, totalData, seriesOut: undefined };
    }, [monthsSeries, downtimeSeries, labelsProp, series, totalDataProp]);

    return (
        <div className='relative'>
            <div className='relative mb-[10px] flex items-center justify-between'>
                <div className='text-[11px] text-[#00203380]'>Общее кол-во сигналов, шт</div>
                <div className='absolute left-1/2 -translate-x-1/2 transform text-[14px] text-[#002033BF] uppercase'>
                    {title}
                </div>
            </div>
            <div className='relative w-full'>
                <BarChart
                    labels={labels}
                    goodData={goodData}
                    badData={badData}
                    totalData={totalData}
                    series={seriesOut}
                    loading={loading}
                />
            </div>
        </div>
    );
};
