// MonthPickerPeriod.tsx
import React, {FC, Fragment, useCallback, useMemo, useRef, useState} from 'react';
import {DateRange, MonthDataRangeProps} from "./datePicker.types.ts";
import {endOfMonth, splitIntoSubArr} from "./utils.ts";
import {MONTH_NAMES_SHORT} from "./local.ts";
import YearPickerPeriod from "./YearPickerPeriod.tsx";
import clsx from "clsx";
import SwitchDateHeader from "./SwitchDateHeader.tsx";
import Button from "../Button/Button.tsx";

const LEFT_COL = 0, MID_COL = 1, RIGHT_COL = 2;

const MonthPickerPeriod: FC<MonthDataRangeProps> = ({
                                                        value,
                                                        onChange,
                                                        onCancel,
                                                        onConfirm,
                                                        isSelectYear = false,
                                                        isFillingAnimate = false,
                                                    }) => {
    const [year, setYear] = useState<number>(value?.from?.getFullYear() ?? new Date().getFullYear());
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
    const storeValueRef = useRef<DateRange>(value);
    const [isOpenYearRange, setIsOpenYearRange] = useState(false);

    // Обработчики с useCallback
    const handleYearChange = useCallback((delta: number) => {
        setYear(prev => prev + delta);
    }, []);

    const handleMonthClick = useCallback((monthIndex: number) => {
        const clickedDate = new Date(year, monthIndex, 1);
        const clickedTime = clickedDate.getTime();

        if (!value.from || value.to) {
            onChange?.({from: clickedDate, to: null});
        } else {
            const fromTime = value.from.getTime();
            onChange?.(clickedTime < fromTime
                ? {from: clickedDate, to: endOfMonth(value.from)}
                : {from: value.from, to: endOfMonth(clickedDate)}
            );
        }
    }, [value, year, onChange]);

    // Предварительные вычисления для оптимизации
    const {fromTime, toTime} = useMemo(() => {
        const from = value.from ? new Date(value.from.getFullYear(), value.from.getMonth(), 1).getTime() : null;
        const to = value.to ? new Date(value.to.getFullYear(), value.to.getMonth(), 1).getTime() : null;
        return {fromTime: from, toTime: to};
    }, [value]);

    const hoveredTime = useMemo(() =>
            hoveredDate ? new Date(hoveredDate.getFullYear(), hoveredDate.getMonth(), 1).getTime() : null,
        [hoveredDate]);

    // Оптимизированные проверки
    const inRange = useCallback((ts: number) =>
            fromTime !== null && toTime !== null && ts > fromTime && ts < toTime,
        [fromTime, toTime]);

    const inRangeFull = useCallback((ts: number) =>
            fromTime !== null && toTime !== null && ts >= fromTime && ts <= toTime,
        [fromTime, toTime]);


    const isHoveredInRange = useCallback((ts: number) => {
        if (!fromTime || toTime || !hoveredTime) return false;
        const [start, end] = fromTime < hoveredTime
            ? [fromTime, hoveredTime]
            : [hoveredTime, fromTime];
        return ts >= start && ts <= end;
    }, [fromTime, toTime, hoveredTime]);

    // Мемоизация месяцев с timestamp
    const arrMonths = useMemo(() =>
            MONTH_NAMES_SHORT.map((name, idx) => {
                const date = new Date(year, idx, 1);
                return {name, date, timestamp: date.getTime()};
            }),
        [year]);

    const arrTriplexMonths = splitIntoSubArr(arrMonths)

    // Обработчики ховера
    const handleMouseEnter = useCallback((date: Date) => () =>
            setHoveredDate(date),
        []);

    const handleOpenYearRange = useCallback(() => {
        storeValueRef.current = value;
        setIsOpenYearRange(true);
    }, [value]);

    return (
        isOpenYearRange ?
            <YearPickerPeriod
                value={value}
                onChange={onChange}
                onCancel={() => {
                    onChange?.(storeValueRef.current);
                    setIsOpenYearRange(false);
                }}
                onConfirm={() => {
                    onConfirm?.();
                    setIsOpenYearRange(false);
                }}
            />
            :
            <div className={clsx(
                'flex flex-col',
                'w-[248px] h-[322px] ',
                'border-[1px] p-[0_10px_10px_10px] rounded-[6px] gap-[14px]',
                'bg-white border-[#E6E9EB]',
                'shadow-[0px_2px_3px_0px_#A6A6A640]',
            )}>

                <div className={clsx(
                    'flex flex-col',
                    'w-[228px] h-[250px]',
                    'p-[10px] gap-[30px]'
                )}>
                    <SwitchDateHeader
                        onPrev={() => handleYearChange(-1)}
                        onNext={() => handleYearChange(1)}
                        onAction={() => isSelectYear && handleOpenYearRange()}>
                        {year}
                    </SwitchDateHeader>


                    <div className={clsx(
                        'flex flex-col gap-[20px]',
                        'w-[208px] h-[172px] ',
                    )}
                         onMouseLeave={() => setHoveredDate(null)}>
                        {arrTriplexMonths.map((arr4Months, iTriplexMonth) => (
                            <div key={iTriplexMonth} className={clsx(
                                'flex flex-row ',
                                'my-0 py-0',
                                'rounded-[6px]'
                            )}>
                                {arr4Months.map(({name, date, timestamp}, iMonthPos) => {
                                    const hovered = isHoveredInRange(timestamp) && isFillingAnimate;

                                    const month = date.getMonth();
                                    const fromMonth = value?.from?.getMonth();
                                    const toMonth = value?.to?.getMonth();
                                    const isFirstMonth = (month == fromMonth) && (date?.getFullYear() == value?.from?.getFullYear());
                                    const isLastMonth = (month == toMonth) && (date?.getFullYear() == value?.to?.getFullYear());

                                    return (
                                        <Fragment key={iMonthPos}>
                                            {(iMonthPos == MID_COL || iMonthPos == RIGHT_COL) &&
                                                <div className={clsx(
                                                    "flex-1",
                                                    (!(isFirstMonth && isLastMonth)) && (!isFirstMonth || isLastMonth) && inRangeFull(timestamp) && " bg-[#DDF1FC]")
                                                }/>}
                                            <div className={clsx(
                                                'flex flex-1',
                                                inRangeFull(timestamp) && 'bg-[#DDF1FC]',
                                                (isFirstMonth || iMonthPos == LEFT_COL) && 'rounded-l-[6px]',
                                                (isLastMonth || iMonthPos == RIGHT_COL) && 'rounded-r-[6px]',
                                            )}
                                            >
                                                <button
                                                    onClick={() => handleMonthClick(date.getMonth())}
                                                    onMouseEnter={handleMouseEnter(date)}
                                                    className={clsx(
                                                        'w-[62px] h-[28px]',
                                                        'text-[11px] rounded-[6px]',
                                                        isFirstMonth && 'bg-[#006FBA] text-white',
                                                        isLastMonth && 'bg-[#006FBA] text-white',
                                                        inRange(timestamp) && 'bg-[#DDF1FC] text-[#1A3747]',
                                                        !isFirstMonth && hovered && !inRangeFull(timestamp) && 'bg-[#006FBA]/50',
                                                    )}
                                                >
                                                    {name}
                                                </button>
                                            </div>
                                            {(iMonthPos == MID_COL || iMonthPos == LEFT_COL) &&
                                                <div className={clsx(
                                                    "flex-1 ",
                                                    (!(isFirstMonth && isLastMonth)) && (isFirstMonth || !isLastMonth) && inRangeFull(timestamp) && "bg-[#DDF1FC]"
                                                )}></div>}
                                        </Fragment>
                                    );
                                })}

                            </div>
                        ))}
                    </div>
                </div>
                {/* Кнопки подтверждения и отмены */}
                <div className="flex justify-between h-[48px] p-[10px]">
                    <Button type="secondary" color="gray" className="!w-[85px]" onClick={onCancel}>Отменить</Button>
                    <Button type="secondary" color="blue" className="!w-[102px]" onClick={onConfirm}>Подтвердить</Button>
                </div>
            </div>
    );
};

export default MonthPickerPeriod;