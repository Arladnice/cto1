import React, { useEffect, useMemo, useState } from 'react';
import InputPeriod from '../../../components/DatePickerPeriod/InputPeriod.tsx';
import { DateRange } from '../../../components/DatePickerPeriod/datePicker.types.ts';
import Button from '../../../components/Button/Button.tsx';
import clsx from 'clsx';
import { IconCaretDown8 } from '@/components/MKD/components/Icons.tsx';
import { Droplist } from '@/components/MKD/components/MenuList.tsx';
import { useStoreCentralTable } from '@/components/MKD/stores/stores.ts';
import { useShallow } from 'zustand/react/shallow';

import { INDICATORS_MODE } from '../../../stores/slices/centralChartsSlice.ts';
import { Current } from './Current.tsx';
import { formatDate } from './utils.ts';
import { Report } from './Report/Report.tsx';

export const Central: React.FC = () => {
    enum ReportType {
        Current = 'Текущее состояние',
        CurrentPeriod = 'Текущее состояние. Выбранный период',
        Subscription = 'Отчет данных по подписке',
    }
    const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(() => {
        // TODO: временно фиксируем дату на 01.09.2025 для режима Current (данные есть только за этот день)
        const fixed = new Date(2025, 8, 1);
        return { from: fixed, to: fixed };
    });
    const [storedDateRange, setStoredDateRange] = useState<DateRange>();
    const [reportType, setReportType] = useState<ReportType>(ReportType.Current);
    const [tilesMode, setTilesMode] = useState<INDICATORS_MODE>(INDICATORS_MODE.Parameters);

    const {
        setDateString,
        setDateToString,
        loadChartsCounters,
        loadGroupByTiles,
        loadGroupByField,
        isLoadingTable,
        isLoadingGeneral,
        isLoadingQuality,
        isLoadingMonths,
        isLoadingTiles,
    } = useStoreCentralTable(
        useShallow((s) => ({
            setDateString: s.setDateString,
            setDateToString: s.setDateToString,
            loadChartsCounters: s.loadChartsCounters,
            loadGroupByTiles: s.loadGroupByTiles,
            loadGroupByField: s.loadGroupByField,
            isLoadingCharts: s.isLoadingCharts,
            isLoadingTable: s.isLoadingTable,
            isLoadingGeneral: s.isLoadingGeneral,
            isLoadingQuality: s.isLoadingQuality,
            isLoadingMonths: s.isLoadingMonths,
            isLoadingTiles: s.isLoadingTiles,
        }))
    );

    const controlsDisabled = useMemo(() => {
        // Disable while any request is loading
        return isLoadingGeneral || isLoadingQuality || isLoadingMonths || isLoadingTiles || isLoadingTable;
    }, [isLoadingGeneral, isLoadingQuality, isLoadingMonths, isLoadingTiles, isLoadingTable]);

    const handleDateConfirm = async (range?: DateRange) => {
        const effectiveRange = range ?? storedDateRange;
        if (!effectiveRange) return;
        setSelectedDateRange(effectiveRange);
        const date = formatDate(effectiveRange.from);
        const dateEnd = reportType === ReportType.Current ? null : formatDate(effectiveRange.to);
        setDateString(date);
        setDateToString(dateEnd);
        await Promise.allSettled([
            loadChartsCounters(),
            loadGroupByTiles(
                tilesMode === INDICATORS_MODE.Parameters ? INDICATORS_MODE.Parameters : INDICATORS_MODE.Rules
            ),
            loadGroupByField(),
        ]);
    };

    useEffect(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let nextRange: DateRange;

        if (reportType === ReportType.Current) {
            // TODO: временное решение: принудительно выставляем 01.09.2025 пока данные только за этот день
            const fixed = new Date(2025, 8, 1);
            nextRange = { from: fixed, to: fixed };
        } else if (reportType === ReportType.CurrentPeriod) {
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            nextRange = { from: monthStart, to: today };
        } else {
            return;
        }

        setSelectedDateRange(nextRange);
        setStoredDateRange(nextRange);
        handleDateConfirm(nextRange);
    }, [reportType]);

    return (
        <div className='MKD min-h-screen'>
            <div className='flex flex-col'>
                <div role='header' className='relative flex h-[50px] items-center justify-between px-[20px] py-[10px]'>
                    <div className='flex flex-row items-center gap-[10px] p-0'>
                        <Droplist
                            className={clsx('w-[200px] bg-transparent')}
                            value={
                                <button
                                    className={clsx(
                                        'flex h-[28px] w-[200px] items-center justify-between gap-[6px] rounded-[6px] border border-[#0020331A] bg-[#EBF4FA4D] px-[10px] text-[12px] leading-[120%] text-[#00203399]',
                                        controlsDisabled
                                            ? 'opacity-60'
                                            : 'cursor-pointer hover:border-[#B3D4EB] hover:bg-[#FFFFFF] hover:text-[#1A3747]'
                                    )}
                                    aria-label='select report type'
                                    disabled={controlsDisabled}
                                >
                                    <span className='truncate'>{reportType}</span>
                                    <IconCaretDown8 />
                                </button>
                            }
                            hideIconArrow={true}
                            empty={true}
                        >
                            <div className='w-[248px] rounded-[6px] border border-[#F2F4F4] bg-white shadow-[0px_2px_5px_0px_#00203326]'>
                                <button
                                    className={
                                        'block w-full cursor-pointer px-[12px] py-[8px] text-left text-[11px] leading-[120%] hover:bg-[#F5F7F9] ' +
                                        (reportType === ReportType.Current
                                            ? 'bg-[#F5F7F9] text-[#1A3747]'
                                            : 'text-[#405866]')
                                    }
                                    onClick={() => setReportType(ReportType.Current)}
                                >
                                    {ReportType.Current}
                                </button>
                                <button
                                    className={
                                        'block w-full cursor-pointer px-[12px] py-[8px] text-left text-[11px] leading-[120%] hover:bg-[#F5F7F9] ' +
                                        (reportType === ReportType.CurrentPeriod
                                            ? 'bg-[#F5F7F9] text-[#1A3747]'
                                            : 'text-[#405866]')
                                    }
                                    onClick={() => setReportType(ReportType.CurrentPeriod)}
                                >
                                    {ReportType.CurrentPeriod}
                                </button>
                                <button
                                    className={
                                        'block w-full cursor-pointer px-[12px] py-[8px] text-left text-[11px] leading-[120%] hover:bg-[#F5F7F9] ' +
                                        (reportType === ReportType.Subscription
                                            ? 'bg-[#F5F7F9] text-[#1A3747]'
                                            : 'text-[#405866]')
                                    }
                                    onClick={() => setReportType(ReportType.Subscription)}
                                >
                                    {ReportType.Subscription}
                                </button>
                            </div>
                        </Droplist>
                        <div className={clsx(controlsDisabled ? 'pointer-events-none opacity-60' : undefined)}>
                            <InputPeriod
                                value={selectedDateRange}
                                onChange={({ from, to }) => setStoredDateRange({ from, to })}
                                onConfirm={handleDateConfirm}
                                onCancel={() => null}
                                singleDate={reportType === ReportType.Current}
                                isHideButtons={reportType === ReportType.Current}
                            />
                        </div>
                    </div>
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[14px] leading-[120%] text-[#002033BF] uppercase'>
                        {reportType === ReportType.Current ? 'Аналитика' : 'Отчет данных по подписке'} "Название актива
                        (ДО)"
                    </div>
                    <Button type='secondary' color='green' size='M' onClick={null}>
                        Экспорт
                    </Button>
                </div>

                {reportType === ReportType.Current || reportType === ReportType.CurrentPeriod ? (
                    <Current
                        selectedDateRange={selectedDateRange}
                        tilesMode={tilesMode}
                        setTilesMode={setTilesMode}
                        controlsDisabled={controlsDisabled}
                    />
                ) : (
                    <Report />
                )}
            </div>
        </div>
    );
};
