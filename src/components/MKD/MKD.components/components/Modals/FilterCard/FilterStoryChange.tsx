import clsx from 'clsx';
import { IconChevronLeft, IconCross } from '@/components/MKD/components/Icons.tsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStoreFilterStoryChange, useStoreSettingFilters } from '@/components/MKD/stores/stores.ts';
import CustomScrollbarVertical from '@/components/MKD/components/Scrollbar/CustomScrollbarVertical.tsx';
import Table, { ClbItemHandler } from '@/components/MKD/components/Table/Table.tsx';
import {
    mockFilterStoryChangeArrHeader,
    mockFilterStoryChangeArrTable,
    mockFilterStoryChangeGroups,
} from '@/components/MKD/mock/mockFilterStoryChange.ts';
import HeaderCellDefault from '@/components/MKD/MKD.components/components/HeaderCellDefault.tsx';
import HeaderFilter from '@/components/MKD/MKD.components/components/Modals/HeaderFilter.tsx';
import Modal from '@/components/MKD/components/Modal/Modal.tsx';
import Button from '@/components/MKD/components/Button/Button.tsx';

interface FilterStoryChangeParams {
    indexRow: number;
    onHide: () => void;
}

const FilterStoryChange = ({ indexRow, onHide }: FilterStoryChangeParams) => {
    const { arrSrcTable, arrSrcHeader } = useStoreSettingFilters(
        useShallow((s) => ({
            arrSrcTable: s.arrTable,
            arrSrcHeader: s.arrHeader,
        }))
    );

    let row = arrSrcTable[indexRow];

    /*Модальные окна*/
    const [isOpenModalHeaderFilters, setIsOpenModalHeaderFilters] = useState(false);
    /*Таблица*/
    const [clickPos, setClickPos] = useState<{ col: number; row: number }>({ col: 0, row: 0 });
    const refTable = useRef(null);

    const {setArrTable, setListGroups, setArrHeader, arrTable, arrHeader, arrSort, sortSwitch, arrFilter} =
        useStoreFilterStoryChange(useShallow((s) => ({
            setArrTable: s.setArrTable,
            setListGroups: s.setListGroups,
            arrHeader: s.arrHeader,
            setArrHeader: s.setArrHeader,
            arrTable: s.arrTable,
            arrSort: s.arrSort,
            sortSwitch: s.sortSwitch,
            arrFilter: s.arrFilter,
        })));

    useEffect(() => {
        setArrHeader(mockFilterStoryChangeArrHeader);
        setListGroups(mockFilterStoryChangeGroups);
        setArrTable(mockFilterStoryChangeArrTable);
    }, []);

    const clbHeader: ClbItemHandler = useCallback(
        ({ colIndex }) => (
            <HeaderCellDefault
                arrFilter={arrFilter}
                value={arrHeader[colIndex]}
                arrSort={arrSort}
                colIndex={colIndex}
                onClickSort={() => sortSwitch(colIndex)}
                onClickFilter={() => setIsOpenModalHeaderFilters(true)}
            />
        ),
        [arrTable, arrHeader, arrSort, sortSwitch]
    );

    return (
        <div
            className={clsx(
                'relative flex flex-col gap-[35px] rounded-[10px] p-[20px] pt-[35px]',
                // Base desired size, but keep within viewport with max-constraints
                'h-[873px] max-h-[calc(100vh-40px)] w-[1798px] max-w-[calc(100vw-40px)] overflow-auto',
                'shadow-[0px_8px_16px_0px_#00203312,0px_1px_1px_0px_#00203312,0px_2px_2px_0px_#00203312,0px_1px_1px_0px_#00203312]',
                'bg-white'
            )}
        >
            <div className='absolute top-[6px] right-[6px]' onClick={onHide}>
                <IconCross className='hover:[&>svg>path]:stroke-[#71848e] active:[&>svg>path]:stroke-[#444f55]' />
            </div>

            <div className='flex h-full max-h-[535px] w-full flex-col gap-[20px]'>
                <div className='flex w-full flex-row'>
                    <div className='min-w-[146px]'>
                        <Button type='primary' color='blue' iconLeft={<IconChevronLeft />} onClick={onHide}>
                            Закрыть историю
                        </Button>
                    </div>
                    <div className='h-[28px] w-full content-center text-center text-[12px] text-[#002033]'>
                        ИСТОРИЯ ИЗМЕНЕНИЙ {row[arrSrcHeader.indexOf('Название фильтра')].toLocaleUpperCase()}
                    </div>
                    <div className='min-w-[146px]'></div>
                </div>

                <div className='flex h-[697px] w-full flex-col gap-9 text-xs'>
                    <div className='flex h-[564px] w-full flex-col gap-2.5'>
                        <div className='flex h-[460px] w-full'>
                            <Table
                                className='custom_scrollbar_horizontal--hidden h-[460px] !max-h-[808px] !w-full'
                                arrTable={arrTable}
                                arrHeader={arrHeader}
                                clbStyleHeader={({ colIndex }) =>
                                    clsx('border-t border-b border-[#E6E9EB]', colIndex === 0 && 'border-l', 'border-r')
                                }
                                styleHeaderRow='h-7 text-xs bg-[#F0F2F3]'
                                clbStyleCell={({ colIndex }) =>
                                    clsx(
                                        'pl-2.5 pr-2 text-[#002033BF] border-b border-[#0020331A] content-center text-xs truncate',
                                        colIndex === 0 && 'border-l',
                                        'border-r'
                                    )
                                }
                                clbHeader={clbHeader}
                                onClickHeader={({ colIndex }) => setClickPos((_) => ({ ..._, col: colIndex }))}
                                arrWidthColumn={[
                                    '200px',
                                    'minmax(200px, 1fr)',
                                    'minmax(100px, .5fr)',
                                    'minmax(200px, 1fr)',
                                ]}
                                ref={refTable}
                                clbStyleRow={({ rowIndex }) => {
                                    return clsx(
                                        'h-[27px] text-[#405866] hover:bg-[#F2F4F4]',
                                        arrTable[rowIndex][0] && 'hover:!bg-[#F9F9F9]'
                                    );
                                }}
                            />
                            <CustomScrollbarVertical
                                targetRef={refTable}
                                className='h-[460px] !w-5 bg-white px-2 py-0'
                                classNameThumb='!bg-[#D9DEE1] !w-1 rounded-md'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex h-9 w-full justify-end gap-2.5'>
                <Modal show={isOpenModalHeaderFilters} onHide={() => setIsOpenModalHeaderFilters(false)}>
                    <HeaderFilter
                        store={useStoreFilterStoryChange}
                        col={clickPos.col}
                        onHide={() => setIsOpenModalHeaderFilters(false)}
                        isSelectingColumns={false}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default FilterStoryChange;
