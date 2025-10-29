import clsx from 'clsx';
import Table from '@/components/MKD/components/Table/Table.tsx';
import CustomScrollbarVertical from '@/components/MKD/components/Scrollbar/CustomScrollbarVertical.tsx';
import CustomScrollbarHorizontal from '@/components/MKD/components/Scrollbar/CustomScrollbarHorizontal.tsx';
import Modal from '@/components/MKD/components/Modal/Modal.tsx';
import HeaderFilter from '@/components/MKD/MKD.components/components/Modals/HeaderFilter.tsx';
import { REPORT_TABLE_COLUMN_WIDTHS } from '../utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useStoreCentralTable } from '@/components/MKD/stores/stores';
import { useShallow } from 'zustand/shallow';
import HeaderCellDefault from '../../../components/HeaderCellDefault';
import { useClientTable } from '@/components/MKD/lib/table/useClientTable.ts';
import { useDynamicTableHeight } from '@/components/MKD/lib/useDynamicTableHeight';

export const ReportTable = () => {
    const refScroll = useRef(null);
    const { containerRef, height: tableHeight } = useDynamicTableHeight(240, 20);
    const [isOpenModalHeaderFilters, setIsOpenModalHeaderFilters] = useState(false);
    const [clickPos, setClickPos] = useState<{ col: number; row: number }>({ col: 0, row: 0 });

    const reportHeader = useMemo(
        () => [
            '№',
            'Цех / Кластер',
            'Месторождение',
            'Объект',
            'Датчик',
            'Уровень критичности',
            'До 2 часов',
            'До 8 часов',
            'До 24 часов',
            'До 7 дней',
            'Более 7 дней',
        ],
        []
    );

    // simple mock rows
    const reportRows = useMemo(() => {
        const rows: any[] = [];
        const names = ['Цех-1', 'Цех-2', 'Кластер-А', 'Кластер-B'];
        const fields = ['Вынгапуровское', 'Зимнее', 'Капитоновское'];
        const objects = ['Скв-101', 'Скв-202', 'Скв-303', 'Скв-404'];
        const sensors = ['Давление', 'Температура', 'Расход', 'Вибрация'];
        const critical = ['Низкий', 'Средний', 'Высокий'];
        for (let i = 0; i < 20; i++) {
            const u2 = Math.floor(10 + Math.random() * 150);
            const u8 = Math.floor(5 + Math.random() * 80);
            const u24 = Math.floor(3 + Math.random() * 50);
            const u7 = Math.floor(1 + Math.random() * 30);
            const m7 = Math.floor(1 + Math.random() * 20);
            rows.push([
                i + 1,
                names[i % names.length],
                fields[i % fields.length],
                objects[i % objects.length],
                sensors[i % sensors.length],
                critical[i % critical.length],
                u2,
                u8,
                u24,
                u7,
                m7,
            ]);
        }
        return rows;
    }, []);

    const store = useStoreCentralTable;
    const {
        setArrHeader: setArrHeaderStore,
        arrHeader,
        arrSort,
        arrFilter,
        arrIncludedColumn,
    } = useStoreCentralTable(
        useShallow((s) => ({
            setArrHeader: s.setArrHeader,
            arrHeader: s.arrHeader,
            arrSort: s.arrSort,
            arrFilter: s.arrFilter,
            arrIncludedColumn: s.arrIncludedColumn,
        }))
    );

    // sync header and rows into store so HeaderFilter/sorting use same source
    useEffect(() => {
        setArrHeaderStore(reportHeader as any);
    }, [setArrHeaderStore, reportHeader]);

    const { filteredRows, onHeaderSort } = useClientTable(arrHeader, reportRows);

    const arrColExcludes = useMemo(() => {
        return (arrIncludedColumn ?? []).map((v: boolean, i: number) => (v ? -1 : i)).filter((i: number) => i > -1);
    }, [arrIncludedColumn]);

    const clbHeader = useCallback(
        ({ value, colIndex }: { value: any; colIndex: number }) => (
            <HeaderCellDefault
                arrFilter={arrFilter}
                hideSort={[0].includes(colIndex)}
                hideFilter={[6, 7, 8, 9, 10].includes(colIndex)}
                value={value}
                arrSort={arrSort}
                colIndex={colIndex}
                onClickSort={() => onHeaderSort(colIndex)}
                onClickFilter={() => setIsOpenModalHeaderFilters(true)}
            />
        ),
        [arrFilter, arrSort, onHeaderSort]
    );

    return (
        <>
            <div
                role='table-header'
                className='flex flex-row items-center justify-center gap-[6px] pt-[16px] text-[14px] leading-[120%] text-[#002033BF] uppercase'
            >
                <div>Сигналы, имеющие прерывания по поставке / некачественные сигналы</div>
            </div>
            <div className='px-[20px] pt-[13px]'>
                <div
                    role='containertablescroll'
                    ref={containerRef as any}
                    className={clsx('relative flex w-full flex-row gap-[6px]')}
                    style={{ height: `${tableHeight}px` }}
                >
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
                        arrWidthColumn={[...REPORT_TABLE_COLUMN_WIDTHS]}
                        ref={refScroll}
                        arrColExcludes={arrColExcludes}
                        onClickHeader={({ colIndex }: any) => setClickPos((_) => ({ ..._, col: colIndex }))}
                        onClickCell={({ rowIndex, colIndex }: any) =>
                            setClickPos((_) => ({ col: colIndex, row: rowIndex }))
                        }
                        clbStyleRow={() => clsx('hover:bg-[#F2F4F4] h-[32px] w-full')}
                    />
                    <div className='w-[20px]'>
                        <CustomScrollbarVertical
                            refreshTime={500}
                            targetRef={refScroll}
                            classNameThumb='!w-[6px] rounded-[4px] !bg-[#D6DBDE]'
                            kDelta={1}
                        />
                    </div>
                </div>
                <div className='mt-[6px] flex items-center justify-center'>
                    <CustomScrollbarHorizontal
                        targetRef={refScroll}
                        kDelta={0.8}
                        refreshTime={500}
                        className='mx-[8px] h-[6px] w-full max-w-full rounded-[4px] !bg-[#F0F2F3]'
                        classNameThumb='rounded-[4px] !bg-[#D6DBDE]'
                    />
                </div>
                <Modal show={isOpenModalHeaderFilters} onHide={() => setIsOpenModalHeaderFilters(false)}>
                    <HeaderFilter store={store} col={clickPos.col} onHide={() => setIsOpenModalHeaderFilters(false)} />
                </Modal>
            </div>
        </>
    );
};
