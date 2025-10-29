import clsx from 'clsx';
import {
    IconBucket,
    IconCheck16,
    IconCross,
    IconCross16,
    IconHistory16,
    IconPlus,
} from '@/components/MKD/components/Icons.tsx';
import Button from '@/components/MKD/components/Button/Button.tsx';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ModalConfirm from '@/components/MKD/components/Modal/ModalConfirm.tsx';
import { useShallow } from 'zustand/react/shallow';
import { useStoreFilterCardCreate, useStoreSettingFilters } from '@/components/MKD/stores/stores.ts';
import { InputModalSelect, InputModalTextField } from '@/components/MKD/components/InputModalTextField.tsx';
import CustomScrollbarVertical from '@/components/MKD/components/Scrollbar/CustomScrollbarVertical.tsx';
import Pagination from '@/components/MKD/components/Pagination/Pagination.tsx';
import TabFilled from '@/components/MKD/components/TabFilled.tsx';
import Table, { ClbItemHandler } from '@/components/MKD/components/Table/Table.tsx';
import {
    mockFilterCardCreateArrHeader,
    mockFilterCardCreateArrTable,
    mockFilterCardCreateListGroups,
} from '@/components/MKD/mock/mockFilterCardCreate.ts';
import HeaderCellDefault from '@/components/MKD/MKD.components/components/HeaderCellDefault.tsx';
import Checkbox from '@/components/MKD/components/Checkbox/Checkbox.tsx';
import HeaderFilter from '@/components/MKD/MKD.components/components/Modals/HeaderFilter.tsx';
import Modal from '@/components/MKD/components/Modal/Modal.tsx';
import FilterStoryChange from '@/components/MKD/MKD.components/components/Modals/FilterCard/FilterStoryChange.tsx';

const serializeArr = (arr: any[]) => JSON.stringify(arr.slice(1));
const getUniqueSubArrays = (arr: any[]) => {
    const seen = new Set();
    return arr.filter((subArr) => {
        const serialized = JSON.stringify(subArr);
        if (seen.has(serialized)) {
            return false;
        } else {
            seen.add(serialized);
            return true;
        }
    });
};

interface FilterCardEdit {
    indexRow: number;
    onHide: () => void;
}

const FilterCardEdit = ({ onHide, indexRow }: FilterCardEdit) => {
    const { arrSrcTable, arrSrcHeader } = useStoreSettingFilters(
        useShallow((s) => ({
            arrSrcTable: s.arrTable,
            arrSrcHeader: s.arrHeader,
        }))
    );

    let row = arrSrcTable[indexRow];

    const listRowValueByColKey = {
        filterName: row[arrSrcHeader.indexOf('Название фильтра')],
        rule: row[arrSrcHeader.indexOf('Правило')],
        srcData: row[arrSrcHeader.indexOf('Источник данных')],
        dateChange: row[arrSrcHeader.indexOf('Дата последнего изменения')],
        fullName: row[arrSrcHeader.indexOf('ФИО')],
        status: row[arrSrcHeader.indexOf('Статус')],
        rangeMin: row[arrSrcHeader.indexOf('Минимум')],
        rangeMax: row[arrSrcHeader.indexOf('Максимум')],
    };

    const [editing, setEditing] = useState(false);
    const [filterName, setFilterName] = useState(listRowValueByColKey.filterName);

    const [srcData, setSrcData] = useState(listRowValueByColKey.srcData);
    const [rule, setRule] = useState(listRowValueByColKey.rule);
    const [status, setStatus] = useState<string | null>(listRowValueByColKey.status);
    const [rangeMin, setRangeMin] = useState<string | null>(listRowValueByColKey.rangeMin);
    const [rangeMax, setRangeMax] = useState<string | null>(listRowValueByColKey.rangeMax);
    const [isShowControlParams, setIsShowControlParams] = useState(false);

    /*Модальные окна*/
    const [modals, setModals] = useState({ apply: false, cancel: false });
    const [isOpenModalHeaderFilters, setIsOpenModalHeaderFilters] = useState(false);
    const [isOpenModalHistoryChange, setIsOpenModalHistoryChange] = useState(false);

    /*Выбранные Индексы таблицы*/
    const [clickPos, setClickPos] = useState<{ col: number; row: number }>({ col: 0, row: 0 });

    const [isAnyRowSelected, setIsAnyRowSelected] = useState(false);
    const [isAllRowSelected, setIsAllRowSelected] = useState(false);

    const arrHashRef = useRef<string[]>([]);
    const arrAllParamsRef = useRef<any[]>([]);
    const arrControlParamRef = useRef<any[]>([]);
    const refTable = useRef(null);

    const {setArrTable, setListGroups, setArrHeader, arrTable, arrHeader, setTableCell, arrSort, sortSwitch, arrFilter} =
        useStoreFilterCardCreate(useShallow((s) => ({
            setArrTable: s.setArrTable,
            setListGroups: s.setListGroups,
            arrHeader: s.arrHeader,
            setArrHeader: s.setArrHeader,
            arrTable: s.arrTable,
            setTableCell: s.setTableCell,
            arrSort: s.arrSort,
            sortSwitch: s.sortSwitch,
            arrFilter: s.arrFilter,
        })));

    useEffect(() => {
        setArrHeader(mockFilterCardCreateArrHeader);
        setListGroups(mockFilterCardCreateListGroups);
        arrAllParamsRef.current = mockFilterCardCreateArrTable;
        setArrTable(mockFilterCardCreateArrTable);
    }, []);

    const dataPage = useMemo(
        () => ({
            totalItems: 150,
            itemsPerPage: 15,
            initialPage: 1,
            onPageChange: () => null,
        }),
        []
    );

    const handleCheckboxChange = useCallback(
        (rowIndex: number, checked: boolean) => {
            setTableCell(0, rowIndex, checked);
            setIsAnyRowSelected(checked || arrTable.some((row, i) => i !== rowIndex && row[0]));
            setIsAllRowSelected(checked && arrTable.every((row, i) => (i === rowIndex ? checked : row[0])));
        },
        [arrTable, setTableCell]
    );

    const clbHeader: ClbItemHandler = useCallback(
        ({ colIndex }) =>
            colIndex === 0 ? (
                <div className='px-[10px]'>
                    <Checkbox
                        className='!bg-white'
                        checked={isAllRowSelected}
                        onChange={(checked) => {
                            arrTable.forEach((_, i) => {
                                if (!arrHashRef.current.includes(serializeArr(arrTable[i])) || isShowControlParams) {
                                    setTableCell(0, i, checked);
                                }
                            });
                            setIsAnyRowSelected(checked);
                            setIsAllRowSelected(checked);
                        }}
                    />
                </div>
            ) : (
                <HeaderCellDefault
                    arrFilter={arrFilter}
                    value={arrHeader[colIndex]}
                    arrSort={arrSort}
                    colIndex={colIndex}
                    onClickSort={() => sortSwitch(colIndex)}
                    onClickFilter={() => setIsOpenModalHeaderFilters(true)}
                />
            ),
        [isAllRowSelected, arrTable, arrHeader, arrSort, sortSwitch, isShowControlParams, setTableCell]
    );

    const clbCell: ClbItemHandler = useCallback(
        ({ value, colIndex, rowIndex }) => {
            if (colIndex !== 0) return null;
            const rowSerialized = serializeArr(arrTable[rowIndex]);
            const disabled = !isShowControlParams && arrHashRef.current.includes(rowSerialized);
            return (
                <Checkbox
                    className='!bg-white'
                    disabled={disabled}
                    checked={!!value}
                    onChange={(checked: boolean, e) => {
                        e.stopPropagation();
                        handleCheckboxChange(rowIndex, checked);
                    }}
                />
            );
        },
        [arrTable, isShowControlParams, handleCheckboxChange]
    );

    const addParameter = useCallback(() => {
        const arrOnlySelected = arrTable.filter((row) => row[0]);
        const arrResetSelected = arrOnlySelected.map((row) => [false, ...row.slice(1)]);
        const arrUnionTables = getUniqueSubArrays([...arrResetSelected, ...arrControlParamRef.current]);
        arrHashRef.current = arrUnionTables.map(serializeArr);
        arrControlParamRef.current = arrUnionTables;
        setIsAnyRowSelected(false);
        setIsAllRowSelected(false);
    }, [arrTable]);

    const removeParameter = useCallback(() => {
        const arrOnlyUnselected = arrTable.filter((row) => !row[0]);
        arrControlParamRef.current = arrOnlyUnselected;
        setArrTable(arrOnlyUnselected);
        arrHashRef.current = arrOnlyUnselected.map(serializeArr);

        arrAllParamsRef.current = arrAllParamsRef.current.map(
            (
                row // При удалении снимаем checkbox-ы
            ) => (arrHashRef.current.includes(serializeArr(row)) ? row : [false, ...row.slice(1)])
        );

        setIsAnyRowSelected(false);
        setIsAllRowSelected(false);
    }, [arrTable, setArrTable]);

    return (
        <div
            className={clsx(
                'relative flex flex-col gap-9 rounded-[10px] p-5 pt-9',
                // Fixed base size, constrained to viewport
                'h-[873px] max-h-[calc(100vh-40px)] w-[1798px] max-w-[calc(100vw-40px)] overflow-auto',
                'shadow-[0px_8px_16px_0px_#00203312,0px_1px_1px_0px_#00203312,0px_2px_2px_0px_#00203312,0px_1px_1px_0px_#00203312]',
                'bg-white'
            )}
        >
            <div className='absolute top-2 right-2' onClick={onHide}>
                <IconCross className='hover:[&>svg>path]:stroke-[#71848e] active:[&>svg>path]:stroke-[#444f55]' />
            </div>

            <div className='flex h-full max-h-[745px] w-full flex-col gap-5'>
                <div className='flex flex-row'>
                    <div className='w-[176px]'></div>
                    <div className='h-7 w-full content-center text-center text-xs text-[#002033]'>
                        {filterName.toLocaleUpperCase()}
                        {editing && '. РЕЖИМ РЕДАКТИРОВАНИЯ'}
                    </div>
                    <div className={clsx('flex w-[176px] flex-row gap-[10px]', editing && 'invisible')}>
                        <Button
                            type='primary'
                            color='blue'
                            onClick={() => setIsOpenModalHistoryChange(true)}
                            className='!w-[28px]'
                        >
                            <IconHistory16 />
                        </Button>
                        <Button type='primary' color='blue' onClick={() => setEditing(true)}>
                            Редактировать
                        </Button>
                    </div>
                </div>

                <div className='flex h-[697px] w-full flex-col gap-9 text-xs'>
                    <div className='flex h-[98px] w-full flex-col gap-2.5'>
                        <div className='flex h-11 gap-5'>
                            <InputModalTextField
                                value={filterName}
                                onChange={setFilterName}
                                label='Название фильтра'
                                placeholder='Введите название фильтра'
                                className={clsx(editing && '!bg-[#F0F9FF]')}
                            />
                            <InputModalSelect
                                value={rule}
                                label='Правило'
                                placeholder='Выберите из списка правило'
                                arrList={[
                                    'Полнота поставки',
                                    'Статус поверки средства измерения',
                                    'Достоверный диапазон сигнала',
                                ]}
                                onChange={(_, value) => setRule(value)}
                                className={clsx(editing && '!bg-[#F0F9FF]')}
                            />
                        </div>
                        <div className='flex h-11 flex-row gap-5'>
                            <div className='flex flex-1 flex-row gap-5'>
                                <InputModalSelect
                                    value={srcData}
                                    label='Источник данных'
                                    placeholder='Выберите из списка источник данных'
                                    arrList={['АСУ ТП', 'МУС АСОПИ', 'Ручной ввод']}
                                    onChange={(_, value) => setSrcData(value)}
                                    className={clsx(editing && '!bg-[#F0F9FF]')}
                                />
                                <InputModalSelect
                                    value={
                                        <div className='flex flex-row gap-[5px]'>
                                            <div
                                                className={clsx(
                                                    'rounded-full',
                                                    status ? 'bg-[#24C38E]' : 'bg-[#CFDAE2]',
                                                    'm-[6px] h-[6px] w-[6px] self-center'
                                                )}
                                            />
                                            <div className='content-center'>{status ? 'Активен' : 'Нективен'}</div>
                                        </div>
                                    }
                                    label='Статус'
                                    className='pointer-events-none'
                                    onChange={(_, value) => setSrcData(value)}
                                />
                            </div>
                            <div
                                className={clsx(
                                    'flex w-full flex-1 gap-5',
                                    srcData !== 'Ручной ввод' ? 'invisible' : ''
                                )}
                            >
                                <InputModalTextField
                                    value={rangeMin}
                                    onChange={setRangeMin}
                                    isNumber={true}
                                    label='Предел min'
                                    placeholder='Введите значение'
                                    className={clsx(editing && '!bg-[#F0F9FF]')}
                                />
                                <InputModalTextField
                                    value={rangeMax}
                                    onChange={setRangeMax}
                                    isNumber={true}
                                    label='Предел max'
                                    placeholder='Введите значение'
                                    className={clsx(editing && '!bg-[#F0F9FF]')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex h-[564px] w-full flex-col gap-2.5'>
                        <div className='h-3.5 w-full content-center text-center text-xs text-[#002033]'>
                            ВЫБОР ПАРАМЕТРОВ ДЛЯ НОВОГО ФИЛЬТРА1
                        </div>
                        <div className='flex h-7 gap-2.5 text-xs'>
                            <TabFilled
                                className='w-[245px]'
                                active={!isShowControlParams}
                                title='Выбор параметров для нового фильтра'
                                type='secondary'
                                onClick={() => {
                                    setIsShowControlParams(false);
                                    arrControlParamRef.current = arrTable;
                                    setArrTable(arrAllParamsRef.current);
                                }}
                            />
                            <TabFilled
                                counter={arrControlParamRef.current.length}
                                className='w-[219px]'
                                title='Контролируемые параметры'
                                type='secondary'
                                active={isShowControlParams}
                                onClick={() => {
                                    setIsShowControlParams(true);
                                    arrAllParamsRef.current = arrTable;
                                    setArrTable(arrControlParamRef.current);
                                }}
                            />
                        </div>
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
                                clbCell={clbCell}
                                onClickHeader={({ colIndex }) => setClickPos((_) => ({ ..._, col: colIndex }))}
                                onClickCell={({ rowIndex, colIndex }) =>
                                    setClickPos((_) => ({
                                        col: colIndex,
                                        row: rowIndex,
                                    }))
                                }
                                arrWidthColumn={[
                                    '32px',
                                    'minmax(163px, 1fr)',
                                    '160px',
                                    '190px',
                                    '210px',
                                    '240px',
                                    '135px',
                                ]}
                                ref={refTable}
                                clbStyleRow={({ rowIndex }) => {
                                    const disabled =
                                        !isShowControlParams &&
                                        arrHashRef.current.includes(serializeArr(arrTable[rowIndex]));
                                    return clsx(
                                        'h-[27px] text-[#405866] hover:bg-[#F2F4F4]',
                                        arrTable[rowIndex][0] && 'bg-[#F0F9FF] hover:!bg-[#DDF1FC]',
                                        disabled && 'bg-[#F9F9F9] pointer-events-none'
                                    );
                                }}
                            />
                            <CustomScrollbarVertical
                                targetRef={refTable}
                                className='h-[460px] !w-5 bg-white px-2 py-0'
                                classNameThumb='!bg-[#D9DEE1] !w-1 rounded-md'
                            />
                        </div>
                        <div className='flex h-10 w-full items-center'>
                            {!isShowControlParams ? (
                                <Button
                                    type='primary'
                                    color='blue'
                                    iconRight={<IconPlus />}
                                    disabled={!isAnyRowSelected}
                                    onClick={addParameter}
                                    className='min-w-[157px]'
                                >
                                    Добавить в фильтр
                                </Button>
                            ) : (
                                <Button
                                    type='primary'
                                    color='red'
                                    iconRight={<IconBucket />}
                                    disabled={!isAnyRowSelected}
                                    onClick={removeParameter}
                                    className='min-w-[157px]'
                                >
                                    Удалить
                                </Button>
                            )}
                            <div className='w-full justify-items-center'>
                                <Pagination {...dataPage} />
                            </div>
                            <div className='w-[157px]' />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex h-9 w-full justify-end gap-2.5'>
                <Button
                    type='forModal'
                    color='green'
                    size='M'
                    disabled
                    iconLeft={<IconCheck16 color='#99E999' isInheritStyle={false} />}
                    onClick={() => setModals({ ...modals, apply: true })}
                >
                    Создать
                </Button>
                <Button
                    type='forModal'
                    color='gray'
                    size='M'
                    iconLeft={<IconCross16 color='#EB5757' isInheritStyle={false} />}
                    onClick={() => setModals({ ...modals, cancel: true })}
                >
                    Закрыть
                </Button>

                <Modal show={isOpenModalHeaderFilters} onHide={() => setIsOpenModalHeaderFilters(false)}>
                    <HeaderFilter
                        store={useStoreFilterCardCreate}
                        col={clickPos.col}
                        onHide={() => setIsOpenModalHeaderFilters(false)}
                        isSelectingColumns={false}
                    />
                </Modal>

                <Modal show={isOpenModalHistoryChange} onHide={() => setIsOpenModalHistoryChange(false)}>
                    <FilterStoryChange indexRow={clickPos.row} onHide={() => setIsOpenModalHistoryChange(false)} />
                </Modal>

                <ModalConfirm
                    title='СОЗДАНИЕ НОВОГО ФИЛЬТРА'
                    textConfirm='Создать'
                    show={modals.apply}
                    onConfirm={onHide}
                    onCancel={() => setModals({ ...modals, apply: false })}
                    colorConfirm='green'
                    iconConfirm={<IconCheck16 />}
                >
                    Вы уверены, что хотите создать и сохранить все внесенные вами данные?
                </ModalConfirm>

                <ModalConfirm
                    title='ЗАКРЫТЬ БЕЗ ИЗМЕНЕНИЙ'
                    textConfirm='Закрыть'
                    show={modals.cancel}
                    onConfirm={onHide}
                    onCancel={() => setModals({ ...modals, cancel: false })}
                    colorConfirm='red'
                    iconConfirm={<IconCross16 />}
                >
                    Вы уверены, что хотите закрыть окно? Все внесенные изменения будут отменены.
                </ModalConfirm>
            </div>
        </div>
    );
};

export default FilterCardEdit;
