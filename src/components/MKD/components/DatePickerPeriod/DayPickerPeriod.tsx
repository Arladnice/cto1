import React, { FC, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { addMonths, buildCalendar, isToday, startOfMonth } from './utils.ts';
import { DataRangeProps, DateRange } from './datePicker.types.ts';
import { MONTH_NAMES, WEEK_DAYS } from './local';
import MonthPickerPeriod from './MonthPickerPeriod.tsx';
import SwitchDateHeader from './SwitchDateHeader.tsx';
import Button from '../Button/Button.tsx';

const DayPickerPeriod: FC<DataRangeProps> = ({
    value,
    onChange,
    onCancel,
    onConfirm,
    isFillingAnimate = false,
    singleDate = false,
    isHideButtons,
}) => {
    const today = useMemo(() => new Date(), []);
    const { from, to } = value;

    const [leftMonth, setLeftMonth] = useState(() => startOfMonth(from ?? today));
    const [rightMonth, setRightMonth] = useState(() => startOfMonth(to ?? today));
    const [storeValue, setStoreValue] = useState<DateRange>(value);
    const [isOpenMonthRange, setIsOpenMonthRange] = useState(false);
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    // Обновление месяцев при изменении внешнего значения
    useEffect(() => {
        if (from) setLeftMonth(startOfMonth(from));
        if (to) setRightMonth(startOfMonth(to));
    }, [from, to]);

    const leftCalendar = useMemo(() => buildCalendar(leftMonth), [leftMonth]);
    const rightCalendar = useMemo(() => buildCalendar(rightMonth), [rightMonth]);

    // Вспомогательные функции
    const time = (d?: Date) => d?.setHours(0, 0, 0, 0);
    // const isFirstClick = (d: Date) => from && !to && time(d) === time(from);
    // const isLastClick = (d: Date) => to && !from && time(d) === time(to);
    const isFirstClick = (d: Date) => from && time(d) === time(from);
    const isLastClick = (d: Date) => to && time(d) === time(to);
    const inRange = (d: Date) => from && to && time(d)! > time(from)! && time(d)! < time(to)!;
    const inRangeFull = (d: Date) => from && to && time(d)! >= time(from)! && time(d)! <= time(to)!;
    const isSelected = (d: Date) => from && to && time(d)! >= time(from)! && time(d)! <= time(to)!;
    const isStart = (d: Date) => from && time(d)! == time(from)!;
    const isEnd = (d: Date) => to && time(d)! == time(to)!;
    const isFirstDayOfMonth = (date: Date) => date.getDate() === 1;
    const isLastDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const lastDay = new Date(year, month + 1, 0).getDate();
        return day === lastDay;
    };

    const handleMouseEnter = (day: Date) => setHoveredDate(day);
    const handleMouseLeave = () => setHoveredDate(null);

    // Обработка выбора даты
    const handleDayClick = (d: Date, isFrom: boolean) => {
        if (singleDate) {
            const range = { from: d, to: d };
            onChange?.(range);
            if (isHideButtons) {
                onConfirm?.(range);
            }
            return;
        }
        if (from && isFrom && !to) {
            const newRange = from.getTime() < d.getTime() ? { from, to: d } : { from: d, to: from };
            return onChange(newRange);
        }

        const updatedFrom = isFrom ? d : from;
        const updatedTo = isFrom ? to : d;

        if (!updatedFrom || !updatedTo) {
            return onChange({ from: updatedFrom, to: updatedTo });
        }

        const [f, t] =
            updatedFrom.getTime() <= updatedTo.getTime() ? [updatedFrom, updatedTo] : [updatedTo, updatedFrom];

        onChange({ from: f, to: t });
    };

    // Обработка двойного клика
    const handleDayDoubleClick = (d: Date, isFrom: boolean) => {
        if (singleDate) {
            const range = { from: d, to: d };
            onChange?.(range);
            if (isHideButtons) {
                onConfirm?.(range);
            }
            return;
        }
        if (!from || (from && to)) {
            return onChange(isFrom ? { from: d, to: null } : { from: null, to: d });
        }

        const newRange = d.getTime() < time(from)! ? { from: d, to: from } : { from, to: d };

        onChange(newRange);
    };

    // Рендер одного месяца
    const renderMonth = (month: Date, calendar: Date[], setMonth: (m: Date) => void, isFrom: boolean) => (
        <div className='flex w-[228px] flex-col gap-[6px] p-[10px_10px_0_10px]'>
            {/* Заголовок с переключением месяцев */}
            <SwitchDateHeader
                onPrev={() => setMonth(addMonths(-1, month))}
                onNext={() => setMonth(addMonths(1, month))}
                onAction={() => {
                    setStoreValue(value);
                    setIsOpenMonthRange(true);
                }}
            >
                {MONTH_NAMES[month.getMonth()]} {month.getFullYear()}
            </SwitchDateHeader>

            <div className='flex flex-col gap-[4px]'>
                {/* Заголовки дней недели */}
                <div className='flex h-[28px] w-[208px] flex-row gap-[2px] text-[11px] text-[#B3BDC2]'>
                    {WEEK_DAYS.map((day) => (
                        <div key={day} className='h-[28px] w-[28px] flex-1 content-center text-center'>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Сетка календаря */}
                <div className='grid h-[188px] w-[208px] grid-cols-7'>
                    {calendar.map((date, indexDate) => {
                        const currTime = date.getTime();
                        const isCurrentMonth = date.getMonth() === month.getMonth();
                        const isFutureMonth = date.getMonth() > month.getMonth();
                        const hoveredTime = hoveredDate?.getTime();

                        const isBefore = from && hoveredTime && from.getTime() > currTime && hoveredTime <= currTime;
                        const isAfter = from && hoveredTime && from.getTime() < currTime && hoveredTime >= currTime;

                        return (
                            <div key={date.toISOString()} className={clsx('my-[2px] flex flex-row rounded-[6px] py-0')}>
                                <div
                                    className={clsx(
                                        'h-[28px] w-full',
                                        inRangeFull(date) && 'bg-[#DDF1FC]',
                                        isStart(date) && 'invisible',
                                        indexDate % 7 == 0 && 'invisible', // для каждого ПН
                                        !isCurrentMonth && 'invisible', // не тукущий месяц
                                        isFirstDayOfMonth(date) && 'invisible'
                                    )}
                                />
                                <div
                                    className={clsx(
                                        'h-[28px] w-[28px]',
                                        inRange(date) && 'bg-[#DDF1FC] !text-[#1A3747]', // Выделенный диапазон
                                        isSelected(date) && 'bg-[#DDF1FC] !text-[#1A3747]', // Выделенный диапазон
                                        !isCurrentMonth && 'invisible',
                                        isStart(date) && 'rounded-l-[6px]',
                                        isEnd(date) && 'rounded-r-[6px]',
                                        indexDate > 0 && (indexDate + 1) % 7 == 0 && 'rounded-r-[6px]',
                                        indexDate % 7 == 0 && 'rounded-l-[6px]',
                                        isFirstDayOfMonth(date) && 'rounded-l-[6px]',
                                        isLastDayOfMonth(date) && 'rounded-r-[6px]'
                                    )}
                                >
                                    <button
                                        onClick={() => handleDayClick(date, isFrom)}
                                        onDoubleClick={() => handleDayDoubleClick(date, isFrom)}
                                        onMouseEnter={() => handleMouseEnter(date)}
                                        disabled={!isCurrentMonth && date.getMonth() < month.getMonth()}
                                        className={clsx(
                                            'h-[28px] w-[28px] rounded-[6px] text-[11px]',
                                            !isCurrentMonth && 'invisible',
                                            isFutureMonth && 'text-gray-400',
                                            isToday(date, today) && 'inset-ring inset-ring-[#006FBA]', // Сегодня
                                            isFirstClick(date) && '!bg-[#006FBA] text-white', // Маркер начала диап. при выборе
                                            isLastClick(date) && '!bg-[#006FBA] text-white', // Маркер конца диап. при выборе
                                            inRange(date) && 'bg-[#DDF1FC] !text-[#1A3747]', // Выделенный диапазон
                                            isSelected(date) && 'bg-[#006FBA] text-white', // Маркер нач/конца диап.
                                            isFillingAnimate && isAfter && '!bg-[#006FBA80]/50',
                                            isFillingAnimate && isBefore && '!bg-[#006FBA80]/50'
                                        )}
                                    >
                                        {date.getDate()}
                                    </button>
                                </div>
                                <div
                                    className={clsx(
                                        'h-[28px] w-full',
                                        inRangeFull(date) && 'bg-[#DDF1FC]',
                                        isEnd(date) && 'invisible',
                                        indexDate > 0 && (indexDate + 1) % 7 == 0 && 'invisible',
                                        !isCurrentMonth && 'invisible',
                                        isLastDayOfMonth(date) && 'invisible'
                                    )}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return isOpenMonthRange ? (
        <MonthPickerPeriod
            value={value}
            onChange={onChange}
            onCancel={() => {
                onChange(storeValue);
                setIsOpenMonthRange(false);
            }}
            onConfirm={() => setIsOpenMonthRange(false)}
            isSelectYear={true}
        />
    ) : (
        <div
            className={clsx(
                'bg-white',
                isHideButtons ? 'h-[274px]' : 'h-[322px]',
                'p-[0_10px_10px_10px]',
                singleDate ? 'w-[250px]' : 'w-[476px]',
                'rounded-[6px] border-[1px] border-[#E6E9EB]',
                'shadow-[0px_2px_3px_0px_#A6A6A640]'
            )}
        >
            <div
                className={clsx('flex h-[264px] flex-row', singleDate ? 'w-[228px]' : 'w-[456px]')}
                onMouseLeave={handleMouseLeave}
            >
                {renderMonth(leftMonth, leftCalendar, setLeftMonth, true)}
                {!singleDate && renderMonth(rightMonth, rightCalendar, setRightMonth, false)}
            </div>

            {/* Кнопки подтверждения и отмены */}
            {!isHideButtons && (
                <div
                    className={clsx(
                        'flex h-[48px] justify-end gap-[10px] p-[10px]',
                        singleDate ? 'w-[222px]' : 'w-[456px]'
                    )}
                >
                    <Button type='secondary' color='gray' className='!w-[85px]' onClick={onCancel}>
                        Отменить
                    </Button>
                    <Button
                        type='secondary'
                        color='blue'
                        className='!w-[102px]'
                        onClick={() => onConfirm?.({ from, to })}
                    >
                        Подтвердить
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DayPickerPeriod;
