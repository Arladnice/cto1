import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    type ActiveElement,
    type ChartEvent,
    type Scale,
    type ChartOptions,
} from 'chart.js';
import { getRelativePosition } from 'chart.js/helpers';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { HistogramTooltip } from './HistogramTooltip';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend, ChartDataLabels);

interface BarChartProps {
    labels: string[];
    goodData?: number[]; // legacy
    badData?: number[]; // legacy
    totalData: number[];
    // generic N-series mode
    series?: { label: string; data: number[]; color: string }[];
    loading?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
    labels,
    goodData,
    badData,
    totalData,
    series,
    loading = false,
}) => {
    const [tooltip, setTooltip] = useState({
        visible: false,
        x: 0,
        y: 0,
        goodValue: 0,
        badValue: 0,
        total: 0,
        seriesValues: undefined as undefined | number[],
    });
    const [hoverBox, setHoverBox] = useState({
        visible: false,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    });
    // Removed manual total labels state in favor of chartjs-plugin-datalabels
    const chartRef = useRef<ChartJS<'bar'>>(null);
    const dataRef = useRef({ goodData, badData, totalData, series });

    // Update refs when data changes
    useEffect(() => {
        dataRef.current = { goodData, badData, totalData, series } as any;
    }, [goodData, badData, totalData, series]);

    const handleHover = useCallback((event: ChartEvent, activeElements: ActiveElement[]) => {
        if (activeElements.length > 0 && chartRef.current) {
            const element = activeElements[0];
            const dataIndex = element.index;
            const canvasPosition = getRelativePosition(event, chartRef.current);

            if (Array.isArray((dataRef as any).current.series) && (dataRef as any).current.series.length > 0) {
                const values = (dataRef.current.series ?? []).map((s: any) => s.data?.[dataIndex] ?? 0);
                const total = values.reduce((s: number, v: number) => s + v, 0);
                setTooltip({
                    visible: true,
                    x: canvasPosition.x,
                    y: canvasPosition.y,
                    goodValue: values[0] ?? 0,
                    badValue: values[1] ?? 0,
                    total,
                    seriesValues: values,
                });
            } else {
                setTooltip({
                    visible: true,
                    x: canvasPosition.x,
                    y: canvasPosition.y,
                    goodValue: (dataRef.current.goodData ?? [])[dataIndex] ?? 0,
                    badValue: (dataRef.current.badData ?? [])[dataIndex] ?? 0,
                    total: dataRef.current.totalData[dataIndex],
                    seriesValues: undefined,
                });
            }

            // Calculate hover highlight box covering the column group
            const chart = chartRef.current;
            const meta = chart.getDatasetMeta(0);
            const barEl = meta?.data?.[dataIndex] as BarElement | undefined;
            if (barEl) {
                const props = barEl.getProps(['x', 'width'], true);
                const chartArea = chart.chartArea;
                const count = Math.max(1, dataRef.current.totalData.length);
                const basePad = 25; // pad for 12 points
                const scaled = Math.round((basePad * 12) / count);
                // additionally limit by the actual gap to neighbors on the x scale
                const xScale = (chart.scales as Record<string, Scale | undefined>)['x'];
                let maxByGap = Infinity;
                if (xScale && typeof (xScale as any).getPixelForTick === 'function') {
                    const xCenter = props.x;
                    const leftTick = dataIndex > 0 ? (xScale as any).getPixelForTick(dataIndex - 1) : undefined;
                    const rightTick =
                        dataIndex < count - 1 ? (xScale as any).getPixelForTick(dataIndex + 1) : undefined;
                    const gapLeft = leftTick !== undefined ? xCenter - leftTick : Infinity;
                    const gapRight = rightTick !== undefined ? rightTick - xCenter : Infinity;
                    const halfMinGap = Math.min(gapLeft, gapRight) - props.width / 2 - 2; // keep 2px margin
                    if (Number.isFinite(halfMinGap)) {
                        maxByGap = Math.max(0, Math.floor(halfMinGap));
                    }
                }
                const pad = Math.max(2, Math.min(basePad, scaled, maxByGap));
                const left = props.x - props.width / 2 - pad;
                const width = props.width + pad * 2;
                const top = chartArea.top;
                const height = chartArea.bottom - chartArea.top;
                setHoverBox({ visible: true, left, top, width, height });

                // total label now handled by datalabels plugin
            }
        }
    }, []);

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
        if (chartRef.current) {
            const nativeEvent = event.nativeEvent;
            const elements = chartRef.current.getElementsAtEventForMode(
                nativeEvent,
                'index',
                { intersect: true },
                true
            );

            if (elements.length === 0) {
                setTooltip((prev) => ({ ...prev, visible: false }));
                setHoverBox((prev) => ({ ...prev, visible: false }));
            }
        }
    }, []);

    // Removed effect computing manual label positions; datalabels handles positioning and resizing

    const formattedLabels = useMemo(() => {
        // Define month mappings in a single place
        const monthMappings = [
            { full: 'январь', abbr: 'янв', formatted: 'Янв.' },
            { full: 'февраль', abbr: 'фев', formatted: 'Фев.' },
            { full: 'март', abbr: 'мар', formatted: 'Мар.' },
            { full: 'апрель', abbr: 'апр', formatted: 'Апр.' },
            { full: 'май', abbr: 'май', formatted: 'Май' },
            { full: 'июнь', abbr: 'июн', formatted: 'Июн.' },
            { full: 'июль', abbr: 'июл', formatted: 'Июл.' },
            { full: 'август', abbr: 'авг', formatted: 'Авг.' },
            { full: 'сентябрь', abbr: 'сен', formatted: 'Сен.' },
            { full: 'октябрь', abbr: 'окт', formatted: 'Окт.' },
            { full: 'ноябрь', abbr: 'ноя', formatted: 'Ноя.' },
            { full: 'декабрь', abbr: 'дек', formatted: 'Дек.' },
        ];

        // Create maps from the array for easier lookups
        const fullToAbbrMap: Record<string, string> = {};
        const abbrToFormattedMap: Record<string, string> = {};
        
        monthMappings.forEach(item => {
            fullToAbbrMap[item.full] = item.abbr;
            abbrToFormattedMap[item.abbr] = item.formatted;
        });

        return labels.map((label) => {
            const cleaned = label
                .toLowerCase()
                .replace(/\s*г\.?$/u, '')
                .trim();
            const parts = cleaned.split(/\s+/u);

            if (parts.length < 2) return label; // fallback

            let monthRaw = parts[0].replace(/\.$/u, '');
            const year = parts[1];

            // Normalize month name to 3-letter abbreviation for lookup
            let normalizedKey = monthRaw;
            if (monthRaw.length > 3) {
                // Map full month names to their 3-letter abbreviations
                normalizedKey = fullToAbbrMap[monthRaw] || monthRaw.slice(0, 3);
            }

            // Look up the formatted month using the normalized key
            const formattedMonth = abbrToFormattedMap[normalizedKey] ?? normalizedKey.charAt(0).toUpperCase() + normalizedKey.slice(1) + '.';
            return `${formattedMonth} ${year}`;
        });
    }, [labels]);

    // Memoize chart data to prevent unnecessary re-renders
    const chartData = useMemo(() => {
        if (series && series.length > 0) {
            return {
                labels: formattedLabels,
                datasets: series.map((s) => ({
                    label: s.label,
                    data: s.data,
                    backgroundColor: s.color,
                    borderWidth: 0,
                    maxBarThickness: 19,
                    borderRadius: 2,
                })),
            };
        }
        return {
            labels: formattedLabels,
            datasets: [
                {
                    label: 'Некачественных',
                    data: badData ?? [],
                    backgroundColor: '#FE7070',
                    borderWidth: 0,
                    maxBarThickness: 19,
                    borderRadius: 2,
                },
                {
                    label: 'Качественных',
                    data: goodData ?? [],
                    backgroundColor: '#95D890',
                    borderWidth: 0,
                    maxBarThickness: 19,
                    borderRadius: 2,
                },
            ],
        };
    }, [formattedLabels, goodData, badData, series]);

    // Memoize chart options to prevent unnecessary re-renders
    const chartOptions: ChartOptions<'bar'> = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                },
                datalabels: {
                    // Show only once per stack (on top dataset)
                    display: (ctx: any) => ctx.datasetIndex === (ctx.chart?.data?.datasets?.length ?? 1) - 1,
                    formatter: (_value: any, ctx: any) => {
                        const i = ctx.dataIndex as number;
                        if (series && series.length > 0) {
                            const total = series.reduce((s, d) => s + (d.data[i] ?? 0), 0);
                            return Number(total).toLocaleString('ru-RU');
                        }
                        const v = totalData[i] ?? 0;
                        return Number(v).toLocaleString('ru-RU');
                    },
                    anchor: 'end',
                    align: 'end',
                    offset: 0,
                    color: '#002033BF',
                    font: { size: 14, weight: 'normal' },
                    clamp: true,
                    clip: false,
                },
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: '#00203399',
                        font: {
                            size: 11,
                        },
                        maxRotation: 0,
                        minRotation: 0,
                        padding: 0,
                    },
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    max: (() => {
                        if (series && series.length > 0) {
                            const totals = labels.map((_, i) => series.reduce((s, d) => s + (d.data[i] ?? 0), 0));
                            return Math.max(...totals) * 1.1;
                        }
                        return Math.max(...totalData) * 1.1;
                    })(),
                    grid: {
                        color: '#0020331A',
                    },
                    ticks: {
                        color: '#00203399',
                        font: {
                            size: 11,
                        },
                        callback: function (value: any) {
                            return value.toLocaleString('ru-RU');
                        },
                    },
                },
            },
            interaction: {
                intersect: true,
                mode: 'index' as const,
            },
            onHover: handleHover,
        }),
        [totalData, handleHover]
    );

    if (loading) {
        return (
            <div className='relative h-[135px] w-full'>
                <div className='absolute inset-0 animate-pulse rounded-[6px] bg-[#F5F7F9]' />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] text-[#00203380]'>
                    Загрузка…
                </div>
            </div>
        );
    }

    return (
        <div className='relative h-[135px]' onMouseLeave={() => setTooltip((prev) => ({ ...prev, visible: false }))}>
            {hoverBox.visible && (
                <div
                    className='pointer-events-none absolute rounded-[4px] shadow-[0px_2px_5px_0px_#00203326]'
                    style={{
                        left: hoverBox.left,
                        top: hoverBox.top,
                        width: hoverBox.width,
                        height: hoverBox.height,
                        background: '#FFFFFF03',
                    }}
                />
            )}
            <Bar ref={chartRef} data={chartData} options={chartOptions} height={135} onMouseMove={handleMouseMove} />
            <HistogramTooltip
                visible={tooltip.visible}
                x={tooltip.x}
                y={tooltip.y}
                goodValue={tooltip.goodValue}
                badValue={tooltip.badValue}
                total={tooltip.total}
                seriesLabels={series?.map((s) => s.label)}
                seriesValues={tooltip.seriesValues}
                seriesColors={series?.map((s) => s.color)}
            />
        </div>
    );
};
