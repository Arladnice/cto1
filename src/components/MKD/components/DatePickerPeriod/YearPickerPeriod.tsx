// YearPickerPeriod.tsx
import React, {Fragment, useCallback, useMemo, useState} from 'react';
import clsx from 'clsx';
import {DataRangeProps} from "./datePicker.types.ts";
import SwitchDateHeader from "./SwitchDateHeader.tsx";
import Button from "../Button/Button.tsx";

const LEFT_COL = 0, MID_COL = 1, RIGHT_COL = 2;

interface YearButtonProps {
    year: number;
    isSelected: boolean;
    isInRange: boolean;
    isHovered: boolean;
    onClick: (year: number) => void;
    onMouseEnter: (year: number) => void;
}

const YearPickerPeriod: React.FC<DataRangeProps> = ({
                                                        value,
                                                        onChange,
                                                        onCancel,
                                                        onConfirm,
                                                        isFillingAnimate = false
                                                    }) => {
    const currentYear = new Date().getFullYear();
    const [viewYear, setViewYear] = useState<number>(currentYear);
    const [hoveredYear, setHoveredYear] = useState<number | null>(null);

    // Отсчитываем 10 лет
    const startDecade = Math.floor(viewYear / 10) * 10;
    const years = useMemo(() =>
            Array.from({length: 12}, (_, i) => startDecade + i - 1),
        [startDecade]
    );

    const fromYear = value.from?.getFullYear() ?? null;
    const toYear = value.to?.getFullYear() ?? null;

    // Обработчик выделения
    const handleYearClick = useCallback((year: number) => {
        if (fromYear === null || toYear !== null) {
            // Начало выделения
            onChange({from: new Date(year, 0, 1), to: null});
        } else {
            // Конец выделения с правильным порядком
            const start = Math.min(fromYear, year);
            const end = Math.max(fromYear, year);
            onChange({
                from: new Date(start, 0, 1),
                to: new Date(end + 1, 0, 0)
            });
        }
    }, [fromYear, toYear, onChange]);

    // Расчет перекрытия //TODO: неочень оптимально переделать
    const hoveredYearsSet = useMemo(() => {
        if (!value.from || value.to || !hoveredYear) return new Set<number>();

        const fromYear = value.from.getFullYear();
        const start = Math.min(fromYear, hoveredYear);
        const end = Math.max(fromYear, hoveredYear);

        const years = new Set<number>();
        for (let y = start; y <= end; y++) {
            years.add(y);
        }
        return years;
    }, [value.from, value.to, hoveredYear]);

    // Обработчики кнопок навигации +10/-10 лет
    const handlePrevDecade = useCallback(() => setViewYear(prev => prev - 10), []);
    const handleNextDecade = useCallback(() => setViewYear(prev => prev + 10), []);


    return (
        <div className={clsx(
            'flex flex-col',
            'w-[248px] h-[322px] border-[1px] p-[0_10px_10px_10px] gap-[14px]',
            'bg-white border-[#E6E9EB]',
            'shadow-[0px_2px_3px_0px_#A6A6A640]',
        )}>

            <div className={clsx(
                'flex flex-col',
                'w-[228px] h-[250px] p-[10px] gap-[30px]'
            )}>
                {/* Навигация +10/-10 лет */}
                <SwitchDateHeader
                    onPrev={handlePrevDecade}
                    onNext={handleNextDecade}>
                    {startDecade}-{startDecade + 10}
                </SwitchDateHeader>

                {/* Стека по годам */}
                <div className="w-[208px] h-[172px] grid grid-cols-3 gap-y-[20px]"
                     onMouseLeave={() => setHoveredYear(null)}>
                    {years.map((year, iYear) => {
                        const iYearPos = iYear % 3;
                        const isFirstYear = year === fromYear;
                        const isLastYear = year === toYear;
                        const inRange = fromYear !== null && toYear !== null && year > fromYear && year < toYear;
                        const inRangeFull = fromYear !== null && toYear !== null && year >= fromYear && year <= toYear;
                        const isHovered = fromYear && year >= fromYear && hoveredYear >= year && isFillingAnimate;

                        return (
                            <div key={year} className="flex">
                                {(iYearPos == MID_COL || iYearPos == RIGHT_COL) &&
                                    <div className={clsx(
                                        "flex-1",
                                        (!(isFirstYear && isLastYear)) && (!isFirstYear || isLastYear) && inRangeFull && " bg-[#DDF1FC]")
                                    }/>}
                                <div className={clsx(
                                    'flex flex-1',
                                    inRangeFull && 'bg-[#DDF1FC]',
                                    (isFirstYear || iYearPos == LEFT_COL) && 'rounded-l-[6px]',
                                    (isLastYear || iYearPos == RIGHT_COL) && 'rounded-r-[6px]',
                                    iYearPos == LEFT_COL && 'justify-start',
                                    iYearPos == MID_COL && 'justify-center',
                                    iYearPos == RIGHT_COL && 'justify-end',
                                )}
                                >
                                    <button
                                        className={clsx(
                                            'w-[62px] h-[28px]',
                                            'text-[11px] rounded-[6px]',
                                            isFirstYear && 'bg-[#006FBA] text-white',
                                            isLastYear && 'bg-[#006FBA] text-white',
                                            inRange && 'bg-[#DDF1FC] text-[#1A3747]',
                                            fromYear && !toYear && isHovered && 'bg-[#006FBA]/50',
                                        )}
                                        onMouseEnter={() => setHoveredYear(year)}
                                        onClick={() => handleYearClick(year)}
                                    >
                                        {year}
                                    </button>
                                </div>
                                {(iYearPos == MID_COL || iYearPos == LEFT_COL) &&
                                    <div className={clsx(
                                        "flex-1 ",
                                        (!(isFirstYear && isLastYear)) && (isFirstYear || !isLastYear) && inRangeFull && "bg-[#DDF1FC]"
                                    )}></div>}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Кнопки подтверждения и отмены */}
            <div className="flex justify-between w-[228px] h-[48px] p-[10px]">
                <Button type="secondary" color="gray" className="!w-[85px]" onClick={onCancel}>Отменить</Button>
                <Button type="secondary" color="blue" className="!w-[102px]" onClick={onConfirm}>Подтвердить</Button>
            </div>
        </div>
    );
};

export default YearPickerPeriod;