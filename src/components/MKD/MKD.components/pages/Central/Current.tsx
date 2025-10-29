import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ParametersSection } from '../../components/Charts/ParametersSection.tsx';
import { SignalsSection } from '../../components/Charts/SignalsSection.tsx';
import { ChartSection } from '../../components/Charts/ChartSection.tsx';
import GeneralTiles from '../../components/Charts/GeneralTiles.tsx';
import clsx from 'clsx';
import { IconArrowDownBadge12, IconCircle12 } from '@/components/MKD/components/Icons.tsx';
import CustomScrollbarVertical from '@/components/MKD/components/Scrollbar/CustomScrollbarVertical.tsx';
import CustomScrollbarHorizontal from '@/components/MKD/components/Scrollbar/CustomScrollbarHorizontal.tsx';
import { Droplist } from '@/components/MKD/components/MenuList.tsx';
import Table, { ClbItemHandler } from '@/components/MKD/components/Table/Table.tsx';
import LoadingOverlay from '@/components/MKD/components/LoadingOverlay.tsx';
import { useStoreCentralTable } from '@/components/MKD/stores/stores.ts';
import { useShallow } from 'zustand/react/shallow';
import HeaderCellDefault from '@/components/MKD/MKD.components/components/HeaderCellDefault.tsx';
import HeaderFilter from '@/components/MKD/MKD.components/components/Modals/HeaderFilter.tsx';
import Modal from '@/components/MKD/components/Modal/Modal.tsx';

import { mockCentralTableArrHeader } from '@/components/MKD/mock/mockCentralTable.ts';
import ProgressBar from '@/components/MKD/components/ProgressBar.tsx';
import { INDICATORS_MODE } from '../../../stores/slices/centralChartsSlice.ts';
import { DateRange } from '../../../components/DatePickerPeriod/datePicker.types.ts';
import {
    formatDate,
    formatNumber,
    tilesTitle,
    mapTilesToItems,
    TABLE_COLUMN_WIDTHS,
    buildRowsFromFieldStats,
} from './utils.ts';
import { useClientTable } from '@/components/MKD/lib/table/useClientTable.ts';
import { useDynamicTableHeight } from '@/components/MKD/lib/useDynamicTableHeight';

type CurrentProps = {
    selectedDateRange: DateRange;
    tilesMode: INDICATORS_MODE;
    setTilesMode: (mode: INDICATORS_MODE) => void;
    controlsDisabled?: boolean;
};

export const Current = ({
    selectedDateRange,
    tilesMode,
    setTilesMode,
    controlsDisabled: _controlsDisabled = false,
}: CurrentProps) => {
    /*Выбранные Индексы таблицы*/
    const [clickPos, setClickPos] = useState<{ col: number; row: number }>({ col: 0, row: 0 });
    /*Модальные окна*/
    const [isOpenModalHeaderFilters, setIsOpenModalHeaderFilters] = useState(false);
    const refCustomScrollbar = useRef(null);
    const { containerRef, height: tableHeight } = useDynamicTableHeight(300, 20);

    const {
        setDateString,
        setTableGroup,
        loadChartsCounters,
        generalCounter,
        qualityCounter,
        isLoadingGeneral,
        isLoadingQuality,
        isLoadingMonths,
        monthsSeries,
        loadGroupByTiles,
        loadGroupByField,
        tiles,
        isLoadingTiles,
        isLoadingTable,
        fieldStats,
        setArrTable,
        tableGroup,
        resetSortFilter,
    } = useStoreCentralTable(
        useShallow((s) => ({
            setDateString: s.setDateString,
            setTableGroup: s.setTableGroup,
            loadChartsCounters: s.loadChartsCounters,
            generalCounter: s.generalCounter,
            qualityCounter: s.qualityCounter,
            isLoadingCharts: s.isLoadingCharts,
            isLoadingGeneral: s.isLoadingGeneral,
            isLoadingQuality: s.isLoadingQuality,
            isLoadingMonths: s.isLoadingMonths,
            monthsSeries: s.monthsSeries,
            loadGroupByTiles: s.loadGroupByTiles,
            loadGroupByField: s.loadGroupByField,
            tiles: s.tiles,
            isLoadingTiles: s.isLoadingTiles,
            isLoadingTable: s.isLoadingTable,
            fieldStats: s.fieldStats,
            setArrTable: s.setArrTable,
            tableGroup: s.tableGroup,
            resetSortFilter: s.resetSortFilter,
        }))
    );

    function getCellValue(prc: string | number, total: any, color: string) {
        return (
            <div className='flex flex-row items-center gap-1 py-[3px] pr-[5px]'>
                <IconCircle12 color={color} size={7} />
                <div>{prc} %</div>
                <div className='text-[#73858F]'>/ {formatNumber(total)} шт</div>
            </div>
        );
    }

    useEffect(() => {
        const date = formatDate(selectedDateRange.from);
        setDateString(date);
        resetSortFilter();
        // последовательный старт только один раз
        (async () => {
            await loadChartsCounters();
            await loadGroupByField();
            await loadGroupByTiles(
                tilesMode === INDICATORS_MODE.Parameters ? INDICATORS_MODE.Parameters : INDICATORS_MODE.Rules
            );
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // не трогать при первом маунте — уже загружено в init-effect
        if (!rows?.length) return;
        loadGroupByTiles(tilesMode === INDICATORS_MODE.Parameters ? INDICATORS_MODE.Parameters : INDICATORS_MODE.Rules);
    }, [tilesMode]);

    const rows = useMemo(() => buildRowsFromFieldStats(fieldStats), [fieldStats]);

    const { setArrHeader, arrTable, arrHeader, arrSort, arrFilter, arrIncludedColumn } = useStoreCentralTable(
        useShallow((s) => {
            return {
                setArrHeader: s.setArrHeader,
                arrTable: s.arrTable,
                arrHeader: s.arrHeader,
                arrSort: s.arrSort,
                arrFilter: s.arrFilter,
                arrIncludedColumn: s.arrIncludedColumn,
            };
        })
    );

    useEffect(() => {
        setArrHeader(mockCentralTableArrHeader);
    }, []);

    // comparators for complex cells
    const comparators = useMemo(() => {
        const cmpPair = (a: any, b: any, primaryKey: 'prc' | 'total') => {
            const ap = typeof a?.[primaryKey] === 'number' ? a[primaryKey] : 0;
            const bp = typeof b?.[primaryKey] === 'number' ? b[primaryKey] : 0;
            if (ap !== bp) return ap - bp;
            const as =
                typeof a?.[primaryKey === 'prc' ? 'total' : 'prc'] === 'number'
                    ? a[primaryKey === 'prc' ? 'total' : 'prc']
                    : 0;
            const bs =
                typeof b?.[primaryKey === 'prc' ? 'total' : 'prc'] === 'number'
                    ? b[primaryKey === 'prc' ? 'total' : 'prc']
                    : 0;
            return as - bs;
        };
        return {
            // 2: progress by prc
            2: (a: any, b: any) => cmpPair(a, b, 'prc'),
            // 4,5: prc primary then total
            4: (a: any, b: any) => cmpPair(a, b, 'prc'),
            5: (a: any, b: any) => cmpPair(a, b, 'prc'),
            // 6: progress by prc
            6: (a: any, b: any) => cmpPair(a, b, 'prc'),
            // 8,9: total primary then prc
            8: (a: any, b: any) => cmpPair(a, b, 'total'),
            9: (a: any, b: any) => cmpPair(a, b, 'total'),
        } as const;
    }, []);

    const { filteredRows, onHeaderSort } = useClientTable(arrHeader as any, rows as any, comparators as any);

    const arrColExcludes = useMemo(() => {
        return (arrIncludedColumn ?? []).map((v: boolean, i: number) => (v ? -1 : i)).filter((i: number) => i > -1);
    }, [arrIncludedColumn]);

    const clbHeader: ClbItemHandler = useCallback(
        ({ value, colIndex }) => {
            return (
                <HeaderCellDefault
                    arrFilter={arrFilter}
                    hideSort={[0].includes(colIndex)}
                    hideFilter={[0, 2, 3, 4, 5, 7, 8, 9].includes(colIndex)}
                    value={value}
                    arrSort={arrSort}
                    colIndex={colIndex}
                    onClickSort={() => onHeaderSort(colIndex)}
                    onClickFilter={() => setIsOpenModalHeaderFilters(true)}
                />
            );
        },
        [arrSort, arrFilter, onHeaderSort]
    );

    const clbCell: ClbItemHandler = useCallback(
        ({ value, colIndex }) => {
            if (colIndex < 2) return;

            const { prc, total } = value as any;

            if (colIndex == 2)
                return (
                    <ProgressBar
                        max='100'
                        value={+prc}
                        className='h-[6px] w-full rounded-[2px] bg-[#E6E9EB]'
                        classNameThumb='rounded-[2px] bg-[#006FBA]'
                    />
                );

            if (colIndex == 3)
                return <div className='py-[3px] pr-[5px]'>{formatNumber(value as string | number)} шт.</div>;

            if (colIndex == 4) return getCellValue(prc, total, '#006FBA');
            if (colIndex == 5) return getCellValue(prc, total, '#E6E9EB');

            if (colIndex == 6)
                return (
                    <ProgressBar
                        max='100'
                        value={+prc}
                        className='h-[6px] w-full rounded-[2px] bg-[#95D890]'
                        classNameThumb='rounded-[2px] bg-[#FE7070]'
                    />
                );

            if (colIndex == 7)
                return <div className='py-[3px] pr-[5px]'>{formatNumber(value as string | number)} шт.</div>;

            if (colIndex == 8) return getCellValue(prc, total, '#95D890');
            if (colIndex == 9) return getCellValue(prc, total, '#FE7070');
        },
        [arrTable]
    );

    return (
        <div role='content' className='flex flex-col gap-[17px]'>
            <div role='2-col' className='flex gap-[12px] px-[20px]'>
                <div
                    className={`w-[50%] rounded-[10px] border border-[#E5E9EB] bg-white px-[20px] pt-[20px] shadow-[0px_2px_5px_0px_#00203333]`}
                >
                    <div className='mb-[12px] w-full text-center text-[14px] leading-[120%] text-[#002033BF] uppercase'>
                        ОБЩИЕ ПОКАЗАТЕЛИ ПО ДО
                    </div>
                    <div className='mb-[15px] flex flex-row items-start gap-[20px]'>
                        <ParametersSection
                            checkableCount={generalCounter?.verifiableCounter ?? 0}
                            disabledCount={generalCounter?.notVerifiableCounter ?? 0}
                            totalSignals={generalCounter?.sumCounter ?? 0}
                            checkablePercent={generalCounter?.percentVerifiableCounter ?? 0}
                            disabledPercent={generalCounter?.percentNotVerifiableCounter ?? 0}
                            loading={isLoadingGeneral}
                        />
                        <SignalsSection
                            goodSignalsCount={qualityCounter?.goodCounter ?? 0}
                            badSignalsCount={qualityCounter?.badCounter ?? 0}
                            totalParams={qualityCounter?.sumCounter ?? 0}
                            goodSignalsPercent={qualityCounter?.percentGoodCounter ?? 0}
                            badSignalsPercent={qualityCounter?.percentBadCounter ?? 0}
                            loading={isLoadingQuality}
                        />
                    </div>

                    <ChartSection monthsSeries={monthsSeries ?? []} loading={isLoadingMonths} />
                </div>

                <div className={`w-[50%]`}>
                    <GeneralTiles
                        title={tilesTitle(tilesMode)}
                        onModeChange={(mode) =>
                            setTilesMode(
                                mode === INDICATORS_MODE.Parameters ? INDICATORS_MODE.Parameters : INDICATORS_MODE.Rules
                            )
                        }
                        items={mapTilesToItems(tiles)}
                        loading={isLoadingTiles}
                        disabled={isLoadingTiles}
                        currentMode={tilesMode}
                    />
                </div>
            </div>
            <div role='table-container' className={clsx('flex w-full flex-col gap-[13px] pl-[20px]')}>
                <div
                    role='table-header'
                    className='flex flex-row items-center justify-center gap-[6px] text-[14px] leading-[120%] text-[#002033BF] uppercase'
                >
                    <div>
                        {tableGroup === 0 ? 'ПОКАЗАТЕЛИ ПО МЕСТОРОЖДЕНИЯМ' : 'ПОКАЗАТЕЛИ ПО СЕРВИСНЫМ ОРГАНИЗАЦИЯМ'}
                    </div>
                    <Droplist
                        className={clsx(
                            'w-min bg-transparent',
                            isLoadingTable ? 'pointer-events-none cursor-not-allowed opacity-60' : ''
                        )}
                        value={
                            <button
                                className={clsx(
                                    'flex h-[20px] w-[20px] items-center justify-center',
                                    isLoadingTable ? 'cursor-not-allowed' : ''
                                )}
                                aria-label='toggle menu'
                            >
                                <IconArrowDownBadge12 className={clsx(isLoadingTable ? '' : 'cursor-pointer')} />
                            </button>
                        }
                        hideIconArrow={true}
                        empty={true}
                    >
                        <div className='mt-[4px] -ml-[50%] w-[275px] rounded-[6px] border border-[#F2F4F4] bg-white shadow-[0px_2px_5px_0px_#00203326]'>
                            <button
                                className={
                                    'block w-full cursor-pointer px-[12px] py-[8px] text-left text-[12px] leading-[120%] hover:bg-[#F5F7F9] ' +
                                    (tableGroup === 0 ? 'bg-[#F5F7F9] text-[#1A3747]' : 'text-[#73858F]')
                                }
                                onClick={async () => {
                                    setTableGroup(0);
                                    await loadGroupByField();
                                }}
                            >
                                Показатели по месторождениям
                            </button>
                            <button
                                className={
                                    'block w-full cursor-pointer px-[12px] py-[8px] text-left text-[12px] leading-[120%] hover:bg-[#F5F7F9] ' +
                                    (tableGroup === 1 ? 'bg-[#F5F7F9] text-[#1A3747]' : 'text-[#73858F]')
                                }
                                onClick={async () => {
                                    setTableGroup(1);
                                    await loadGroupByField();
                                }}
                            >
                                Показатели по сервисным организациям
                            </button>
                        </div>
                    </Droplist>
                </div>
                <div
                    role='containertablescroll'
                    ref={containerRef as any}
                    className={clsx('relative flex flex-row gap-[6px]')}
                    style={{ height: `${tableHeight}px` }}
                >
                    <LoadingOverlay show={isLoadingTable} />
                    <Table
                        arrTable={filteredRows as any}
                        arrHeader={arrHeader}
                        className={clsx('w-full')}
                        styleHeaderRow={'h-[40px] text-[11px] bg-[#F0F2F3]'}
                        clbStyleCell={() =>
                            clsx(
                                'pl-[10px] pr-[8px] text-[#002033BF]',
                                'border-b-[1px] border-[#0020331A]',
                                'content-center text-[11px] truncate'
                            )
                        }
                        clbHeader={clbHeader}
                        clbCell={clbCell}
                        arrWidthColumn={[...TABLE_COLUMN_WIDTHS]}
                        ref={refCustomScrollbar}
                        arrColExcludes={arrColExcludes}
                        onClickHeader={({ colIndex }) => setClickPos((_) => ({ ..._, col: colIndex }))}
                        onClickCell={({ rowIndex, colIndex }) => {
                            setClickPos((_) => ({ col: colIndex, row: rowIndex }));
                        }}
                        clbFilter={undefined}
                        clbStyleRow={() => clsx('hover:bg-[#F2F4F4] h-[32px] w-full')}
                    />
                    <div className='w-[20px]'>
                        <CustomScrollbarVertical
                            refreshTime={500}
                            targetRef={refCustomScrollbar}
                            classNameThumb='!w-[6px] rounded-[4px] !bg-[#D6DBDE]'
                            kDelta={1}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <CustomScrollbarHorizontal
                        targetRef={refCustomScrollbar}
                        kDelta={0.8}
                        refreshTime={500}
                        className='mx-[8px] h-[6px] w-full max-w-full rounded-[4px] !bg-[#F0F2F3]'
                        classNameThumb='rounded-[4px] !bg-[#D6DBDE]'
                    />
                </div>
                <Modal show={isOpenModalHeaderFilters} onHide={() => setIsOpenModalHeaderFilters(false)}>
                    <HeaderFilter
                        store={useStoreCentralTable}
                        col={clickPos.col}
                        onHide={() => setIsOpenModalHeaderFilters(false)}
                    />
                </Modal>
            </div>
        </div>
    );
};
