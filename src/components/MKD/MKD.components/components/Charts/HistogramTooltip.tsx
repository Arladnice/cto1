import React, { useRef, useEffect, useState } from 'react';
import { ParameterItem } from './ParameterItem';

interface HistogramTooltipProps {
    visible: boolean;
    x: number;
    y: number;
    goodValue?: number;
    badValue?: number;
    total?: number;
    // generic multi-series mode
    seriesLabels?: string[]; // when provided, use multi-series rendering
    seriesValues?: number[]; // same length as seriesLabels
    seriesColors?: string[]; // same length as seriesLabels
}

export const HistogramTooltip: React.FC<HistogramTooltipProps> = ({
    visible,
    x,
    y,
    goodValue,
    badValue,
    total,
    seriesLabels,
    seriesValues,
    seriesColors,
}) => {
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({
        left: x,
        top: y,
        transform: 'translate(0, 26px)',
    });

    useEffect(() => {
        if (visible && tooltipRef.current) {
            const offsetX = 0;
            const offsetY = 26;

            let left = x;
            let top = y;
            let transform = `translate(${offsetX}px, ${offsetY}px)`;

            setPosition((prev) => {
                if (prev.left !== left || prev.top !== top || prev.transform !== transform) {
                    return { left, top, transform };
                }
                return prev;
            });
        }
    }, [visible, x, y]);

    if (!visible) return null;

    const isGeneric = Array.isArray(seriesLabels) && Array.isArray(seriesValues) && Array.isArray(seriesColors);

    const genericTotal = isGeneric ? seriesValues!.reduce((s, v) => s + (v || 0), 0) : (total ?? 0);
    const goodPercent = !isGeneric && total ? Math.round(((goodValue ?? 0) / total) * 100) : 0;
    const badPercent = !isGeneric && total ? Math.round(((badValue ?? 0) / total) * 100) : 0;

    return (
        <div
            ref={tooltipRef}
            className='pointer-events-none absolute z-50 rounded-[6px] border border-[#00203326] bg-white p-[12px] shadow-[0px_2px_5px_0px_#00203326]'
            style={{
                left: position.left,
                top: position.top,
                transform: position.transform,
                whiteSpace: 'nowrap',
            }}
        >
            <div className='mb-[8px] flex items-center justify-between text-[10px] text-[#73858F]'>
                <span>ВСЕГО СИГНАЛОВ</span>
                <div className='flex items-center gap-[2px]'>
                    <span className='text-[12px] font-[500] text-[#1A3747]'>
                        {(isGeneric ? genericTotal : (total ?? 0)).toLocaleString('ru-RU')}
                    </span>
                    <span className='text-[10px]'>шт</span>
                </div>
            </div>
            {isGeneric ? (
                <div className='flex flex-col gap-[12px] text-[14px]'>
                    {seriesLabels!.map((label, i) => {
                        const value = seriesValues![i] ?? 0;
                        const percent = genericTotal > 0 ? Math.round((value / genericTotal) * 100) : 0;
                        return (
                            <ParameterItem
                                key={label}
                                color={seriesColors![i]}
                                label={label}
                                percent={percent}
                                count={value}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className='flex flex-col gap-[12px] text-[14px]'>
                    <ParameterItem
                        color={'#A4DFA0'}
                        label={'Качественных'}
                        percent={goodPercent}
                        count={goodValue ?? 0}
                    />
                    <ParameterItem
                        color={'#FE7070'}
                        label={'Некачественных'}
                        percent={badPercent}
                        count={badValue ?? 0}
                    />
                </div>
            )}
        </div>
    );
};
