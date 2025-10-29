import '../style.css';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from "clsx";
import CustomScrollbarHorizontal from "../components/Scrollbar/CustomScrollbarHorizontal.tsx";
import {DateRange} from "../components/DatePickerPeriod/datePicker.types.ts";
import Button from "../components/Button/Button.tsx";
import InputPeriod from "../components/DatePickerPeriod/InputPeriod.tsx";
import {addDay} from "../components/DatePickerPeriod/utils.ts";
import Table, {ClbItemHandler} from '../components/Table/Table.tsx';
import CustomScrollbarVertical from "@/components/MKD/components/Scrollbar/CustomScrollbarVertical.tsx";
import {IconCheckGreenCircle12, IconCircle12, IconPlus, IconSquareArrowDown} from '../components/Icons.tsx';
import Modal from "@/components/MKD/components/Modal/Modal.tsx";
import HeaderFilter from "@/components/MKD/MKD.components/components/Modals/HeaderFilter.tsx";
import Parameter from "@/components/MKD/MKD.components/components/Modals/Parameter/Parameter.tsx";
import Checkbox from "@/components/MKD/components/Checkbox/Checkbox.tsx";
import {useStoreArchive} from "@/components/MKD/stores/stores.ts";
import HeaderCellDefault from "@/components/MKD/MKD.components/components/HeaderCellDefault.tsx";
import Tooltip from "@/components/MKD/components/Tooltip.tsx";
import {useShallow} from "zustand/react/shallow";
import {startWithCapitalizeLowerLetter} from "@/lib/strings.ts";

function isElementVisibleInContainer(
    container: HTMLElement,
    element: HTMLElement
): boolean {
    if (!container || !element) return false;

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const isVisibleHorizontally =
        elementRect.right > containerRect.left && elementRect.left < containerRect.right;

    const isVisibleVertically =
        elementRect.bottom > containerRect.top && elementRect.top < containerRect.bottom;

    return isVisibleHorizontally && isVisibleVertically
}

export const fieldMapArchive = {
    checkbox: '',
    id: '№',
    paramName: 'Параметр',
    subsidiaryCompany: 'Дочернее общество',
    field: 'Месторождение',
    typeObject1: 'Объект',
    typeObject2: 'Участок, блок, пл. объект',
    techPosition: 'Технологическая позиция',
    techPositionCode: 'Тех. поз. согласно проекта',
    department: 'Цех',
    serviceOrganization: 'Сервисная организация',
    contractNumber: '№ Договора',
    typeSiSa: 'Тип СИ/СА',
    factoryNumberSiSa: 'Заводской номер СИ/СА',
    signalType: 'Тип сигнала',
    groupSiSa: 'Группа СИ/СА',
    criticalLevel: 'Уровень критичности',
    expectedSignals: 'Ожидаемые сигналы',
    qsmSignal: 'Тег сигнала в системе МКД',
    descriptionServiceOrganization: 'Коментарий обсл. орг.',
    sumCounter: 'Общее кол-во сигналов',
    goodCounter: 'Качественные сигналы',
    badCounter: 'Некачественные сигналы',
    failCounter: 'Сбои за предыдущие',
    // :'Тег сигнала в системе МКД',
    // :'Комментарий'
}

useStoreArchive.getState().setListHeaderIndex(fieldMapArchive);

const roundGreenCheck = (value: boolean) => <div className="w-full flex justify-center">{value
    ? <IconCheckGreenCircle12/>
    : <IconCircle12/>
}</div>

export const Archive: React.FC = () => {

    const refTable = useRef(null);
    const _indexUpdateQuality = useRef(null);
    const [keyUpdate, setKeyUpdate] = useState(0)
    /*Диапазон Даты*/
    const [viewDateRange, setViewDateRange] = useState<DateRange>({from: addDay(-49), to: addDay(-40)});

    /*Модальные окна*/
    const [isOpenModalHeaderFilters, setIsOpenModalHeaderFilters] = useState(false);
    const [isOpenModalParameterChange, setIsOpenModalParameterChange] = useState(false); // Открыть модальное окно с изменением параметра
    const [isOpenModalParameterCreate, setIsOpenModalParameterCreate] = useState(false); // Открыть модальное окно для создания параметра

    /*Выбранные Индексы таблицы*/
    const [clickPos, setClickPos] = useState<{ col: number, row: number }>({col: 0, row: 0});

    const [isAnyRowSelected, setIsAnyRowSelected] = useState(false);
    const [isAllRowSelected, setIsAllRowSelected] = useState(false);

    const {
        arrTable,
        arrHeader,
        arrIncludedColumn,
        setTableRow,
        setTableCell,
        arrSort,
        sortSwitch,
        resetSortFilter,
        loadTableData,
        loadTableListGroups,
        arrFilter,
        getListQuality,
        dateRange,
        setDateRange,
        listQuality,
        listFilter,
        getListFilter,
        listHeaderIndex,
        resetIncludeColumn
    } = useStoreArchive(useShallow((s) => {
        return {
            arrTable: s.arrTable,
            arrHeader: s.arrHeader,
            arrIncludedColumn: s.arrIncludedColumn,
            resetIncludeColumn: s.resetIncludeColumn,
            setTableRow: s.setTableRow,
            setTableCell: s.setTableCell,

            arrSort: s.arrSort,
            sortSwitch: s.sortSwitch,
            resetSortFilter: s.resetSortFilter,

            loadTableData: s.loadTableData,
            loadTableListGroups: s.loadTableListGroups,

            arrFilter: s.arrFilter,

            dateRange: s.dateRange,
            setDateRange: s.setDateRange,
            getListQuality: s.getListQuality,
            listQuality: s.listQuality,

            getListFilter: s.getListFilter,
            listFilter: s.listFilter,

            listHeaderIndex: s.listHeaderIndex,
        }
    }));

    useEffect(() => {
        Object.keys(fieldMapArchive).slice(2, 18).forEach(name => loadTableListGroups(startWithCapitalizeLowerLetter(name)));
        setDateRange(viewDateRange);
        // @ts-ignore
        window.useStoreArchive = useStoreArchive.get;
    }, []);

    const clbHeader: ClbItemHandler = useCallback(({value, colIndex}) => {
        if (colIndex == listHeaderIndex.checkbox) return <div className="py-[3px] px-[10px]">
            <Checkbox className="bg-white" checked={isAllRowSelected} onChange={(checked) => {

                for (let i = 0; i < arrTable.length; i++)
                    setTableCell(0, i, checked);

                setIsAnyRowSelected(checked);
                setIsAllRowSelected(checked);
            }}/>
        </div>
        if (colIndex == listHeaderIndex.id) return <div className="py-[3px] px-[10px]">{value}</div>

        return <HeaderCellDefault
            arrFilter={arrFilter}
            value={value} arrSort={arrSort} colIndex={colIndex}
            onClickSort={() => sortSwitch(colIndex)}
            onClickFilter={() => setIsOpenModalHeaderFilters(true)}
            hideFilter={[20, 21, 22, 23].includes(colIndex)}
            hideSort={[20, 21, 22, 23].includes(colIndex)}
            onAdditionalAction={() => {
                resetIncludeColumn();
                resetSortFilter();
            }}
        />
    }, [isAllRowSelected, arrSort, arrFilter, arrTable])

    const clbCell: ClbItemHandler = useCallback(({value, rowIndex, colIndex, arrRow, arrNodes}) => {
        if (colIndex == listHeaderIndex.checkbox)
            return (<Checkbox checked={!!value}
                              onChange={(checked: boolean, e) => {
                                  e.stopPropagation();
                                  setTableCell(colIndex, rowIndex, checked);
                                  setIsAnyRowSelected(checked ? true : arrTable.some((it, i) => i === rowIndex ? checked : it[0]));
                                  setIsAllRowSelected(arrTable.every((it, i) => i === rowIndex ? checked : it[0]));
                              }}/>);
        if (colIndex == listHeaderIndex.id) return (
            <div className="py-[3px] pr-[5px]">{value}</div>)
        // if (colIndex == 15) return roundGreenCheck(value as boolean)
        if (colIndex == listHeaderIndex.criticalLevel) return <Tooltip
            onHover={async () => await getListFilter(arrRow[1])}
            target={
                <div
                    className={clsx(
                        'w-[343px] rounded-[6px] p-[20px]',
                        'bg-[#FFFFFF]',
                        'shadow-[0px_2px_5px_0px_#00203326]'
                    )}>
                    <div className="flex flex-col gap-[10px] text-[11px]">{
                        (listFilter?.[arrRow?.[1]] ?? [])?.map((it, index) => {
                            const isState = true;//getRandomRange(0, 2, 0) > 1;
                            return (<div className="flex flex-row" key={index}>
                                <div
                                    className={clsx("w-full h-[13px]", isState ? 'text-[#002033E5]' : 'text-[##0020334D]')}>
                                    {it}
                                </div>
                                <div>{roundGreenCheck(isState)}</div>
                            </div>)
                        })
                    }</div>

                </div>}
            dir="bottom"
            timeShow={800}
            timeHide={150}
        >
            <div className="flex flex-row gap-[10px]">
                <IconSquareArrowDown/>
                {value}
            </div>
        </Tooltip>
        if (['sumCounter', 'goodCounter', 'badCounter', 'failCounter'].includes(listHeaderIndex[colIndex] + '')) {
            const field = listHeaderIndex[colIndex];
            const id = arrRow[1];

            if (isElementVisibleInContainer(refTable.current, arrNodes?.[rowIndex]?.[colIndex]))
                requestAnimationFrame(() => getListQuality(id));
            return (
                <div className="py-[3px] pr-[5px]">{
                    listQuality[id]?.[field] ?? '...'
                }</div>)
        }

    }, [isAnyRowSelected, arrTable, arrFilter, listQuality, listFilter]);

    const lastIndexHeader = (arrHeader?.length ?? 1) - 1;

    return (
        <div className="MKD min-h-screen">
            <div className="flex flex-col">
                {/* Меню управление */}
                <div className={clsx('flex px-[20px] py-[10px] items-center justify-between', 'h-[50px]')}>

                    <div className={clsx(
                        'w-[328px] h-[30px] gap-[10px] items-center',
                    )}>

                        <div className={clsx('flex flex-row p-0 gap-[10px] mx-auto w-[328px] h-[30px] items-center',)}>
                            {/*Выбор даты*/}
                            <InputPeriod
                                value={viewDateRange}
                                onChange={({from, to}) => {
                                    console.log('change')
                                    setViewDateRange({from, to});
                                }}
                                onConfirm={() => {
                                    console.log('confirm')
                                    setDateRange(dateRange);
                                }}
                                onCancel={() => null}
                            />
                            <Button color="blue" type="primary" size="M" onClick={() => {
                                setIsOpenModalParameterCreate(true);
                            }} iconRight={<IconPlus/>}>
                                Параметр
                            </Button>
                        </div>

                    </div>
                    <div className="text-[#002033BF] text-[14px] w-full text-center">
                        АРХИВ ПАРАМЕТРОВ
                    </div>
                    <Button type="secondary" color="green" size="M" onClick={null}>Экспорт</Button>
                </div>

                {/* Таблица */}
                <div role="containertablescroll" className={clsx('flex flex-row ')}>
                    <Table
                        arrTable={arrTable}
                        arrHeader={arrHeader}
                        clbLoadMore={loadTableData}
                        clbLoadMoreAbove={(i) => {
                            if (_indexUpdateQuality.current != Math.ceil(i / 50)) {
                                _indexUpdateQuality.current = Math.ceil(i / 50);
                                requestAnimationFrame(() => getListQuality(-1));
                                console.log(_indexUpdateQuality.current)
                            }
                            // console.log(i)
                        }}

                        className={clsx(
                            'select-none',
                            '!w-[calc(100vw-20px)]',
                            '!h-[calc(100vh-137px)]',
                            '!max-h-[808px]',
                            'ml-[20px]')}
                        styleHeaderRow={'h-[40px] text-[11px] bg-[#F0F2F3]'}
                        clbStyleCell={({colIndex}) => clsx(
                            'pl-[10px] pr-[8px] text-[#002033BF]',
                            'border-b-[1px] border-[#0020331A]',
                            'content-center text-[11px] truncate',
                            (colIndex >= 2 && colIndex <= 5) && 'bg-[#EBF4FA4D]',
                            colIndex == 1 && 'text-center'
                        )}
                        clbHeader={clbHeader}
                        clbCell={clbCell}
                        // clbFilter={
                        //     ({rowIndex, arrRow}) =>
                        //         arrFilter.map((f, i) => !f ? false : f.includes(arrRow[i])).filter(Boolean).length == total
                        // }
                        arrWidthColumn={[
                            '32px', 'minmax(48px, 1fr)', '130px', '170px', '150px', '150px', '200px', '200px', '200px', '120px', //10
                            '200px', '130px', '120px', '200px', '130px', '180px', '170px', '170px', '200px',//20
                            '200px', '150px', '150px', '160px', '140px',
                        ]}
                        ref={refTable}

                        onClickHeader={({colIndex}) => setClickPos(_ => ({..._, col: colIndex}))}
                        onClickCell={({rowIndex, colIndex, arrRow}) => {
                            (async () => await getListFilter(arrRow[1]))();
                            setIsOpenModalParameterChange(true);
                            setClickPos(_ => ({col: colIndex, row: rowIndex}));
                        }}
                        clbStyleHeader={({colIndex}) => clsx(
                            colIndex == 1 && 'justify-center',
                            lastIndexHeader != colIndex ? 'border-r border-r-[#0020331a]' : 'border-0'
                        )}
                        clbStyleRow={({rowIndex}) => {
                            return clsx(
                                "hover:bg-[#F2F4F4] h-[32px] w-fit",
                                arrTable?.[rowIndex]?.[0] && 'bg-[#F0F9FF] hover:!bg-[#DDF1FC]'
                            );
                        }}
                        arrColExcludes={arrIncludedColumn.map((it, i) => !it && i + '').filter(Boolean).map(Number)}
                    />
                    <div className="w-[20px]">
                        <CustomScrollbarVertical refreshTime={500}
                                                 targetRef={refTable}
                                                 classNameThumb="!w-[6px] rounded-[4px] !bg-[#D6DBDE]"
                                                 kDelta={1}
                                                 onRelease={() => { // завершение дествия со скролом
                                                     // нужно для обновления таблицы что бы невидимые элементы перерисовались
                                                     setKeyUpdate(Date.now());
                                                 }}
                        />
                    </div>
                </div>
                {/* Footer */}
                <div className={clsx(
                    "flex items-center justify-between mt-0 text-sm h-[42px] bg-white",
                    "px-[10px] justify-center"
                )}>
                    <CustomScrollbarHorizontal targetRef={refTable} kDelta={.8} refreshTime={500}
                                               className="mx-[8px] !w-[460px] h-[6px] rounded-[4px] !bg-[#F0F2F3]"
                                               classNameThumb="rounded-[4px] !bg-[#D6DBDE]"
                                               onRelease={() => { // завершение дествия со скролом
                                                   // нужно для обновления таблицы что бы невидимые элементы перерисовались
                                                   setKeyUpdate(Date.now());
                                               }}
                    />
                </div>

            </div>

            <Modal show={isOpenModalHeaderFilters} onHide={() => setIsOpenModalHeaderFilters(false)}>
                <HeaderFilter store={useStoreArchive} col={clickPos.col}
                              onHide={() => setIsOpenModalHeaderFilters(false)}/>
            </Modal>
            <Modal show={isOpenModalParameterCreate} backgroundColor="#00203340">
                <Parameter
                    arrRow={['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', false, '', '', '', '', '', '', '', '']}
                    title={'ПАРАМЕТР'} creating={true}
                    onHide={() => setIsOpenModalParameterCreate(false)}
                    onChange={(arrRow) => { // Создать новый параметр
                        // setTableRow(clickPos.row, arrRow);
                        console.log(arrRow);
                        console.log('Сохранили!')
                    }}/>
            </Modal>
            <Modal show={isOpenModalParameterChange}
                   backgroundColor="#00203340">
                <Parameter arrRow={arrTable[clickPos.row]} title={'ПАРАМЕТР'} creating={false}
                           onHide={() => setIsOpenModalParameterChange(false)}
                           onChange={(arrRow) => {
                               // console.log(arrTable[clickPos.row]);
                               setTableRow(clickPos.row, arrRow);
                           }}/> {/*Записать изменения*/}
            </Modal>

        </div>
    );
};
export default Archive;
