import '../style.css';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import clsx from "clsx";
import Pagination from "../components/Pagination/Pagination.tsx";
import {PaginationProps} from "../components/Pagination/PaginationHeadless.tsx";
import Button from "../components/Button/Button.tsx";
import Table, {ClbItemHandler} from '../components/Table/Table.tsx';
import CustomScrollbarVertical from "@/components/MKD/components/Scrollbar/CustomScrollbarVertical.tsx";
import {IconBucket, IconCheck16, IconCross16, IconPlus, IconRefresh16} from '../components/Icons.tsx';
import Modal from "@/components/MKD/components/Modal/Modal.tsx";
import HeaderFilter from "@/components/MKD/MKD.components/components/Modals/HeaderFilter.tsx";
import Checkbox from "@/components/MKD/components/Checkbox/Checkbox.tsx";
import {useStoreSettingFilters} from "@/components/MKD/stores/stores.ts";

import {
    mockSettingsArrHeader,
    mockSettingsArrTable,
    mockSettingsListGroups
} from "@/components/MKD/mock/mockSettingFilters.ts";
import HeaderCellDefault from "@/components/MKD/MKD.components/components/HeaderCellDefault.tsx";
import CellStatus from "@/components/MKD/MKD.components/components/CellStatus.tsx";
import ModalConfirm from "@/components/MKD/components/Modal/ModalConfirm.tsx";
import Tooltip from "@/components/MKD/components/Tooltip.tsx";
import FilterCardCreate from "@/components/MKD/MKD.components/components/Modals/FilterCard/FilterCardCreate.tsx";
import {useShallow} from "zustand/react/shallow";
import FilterCardEdit from "@/components/MKD/MKD.components/components/Modals/FilterCard/FilterCardEdit.tsx";

// const isTruncatedContent = (elem: HTMLElement) => elem.scrollWidth > elem.clientWidth;

let dataPage: PaginationProps = {
    totalItems: 150,
    itemsPerPage: 15,
    initialPage: 1
};

const StatusListChanged = (props: { rowIndex: number }) => {

    const listHeaderIndex = useStoreSettingFilters.getState().listHeaderIndex;
    const lastChangeDate = useStoreSettingFilters.getState().arrTable[props.rowIndex][listHeaderIndex?.['Дата последнего изменения']];
    const fullName = useStoreSettingFilters.getState().arrTable[props.rowIndex][listHeaderIndex?.['ФИО']];
    const arr = [
        [lastChangeDate, fullName],
        [lastChangeDate, fullName],
        [lastChangeDate, fullName],
        [lastChangeDate, fullName],
        [lastChangeDate, fullName],
    ]

    return <div className={clsx(
        "w-[256px] rounded-[6px] p-[15px] text-[11px]",
        "bg-[#FFFFFF]",
        "shadow-[0px_2px_5px_0px_#00203326]",
        "flex flex-col gap-[15px]"
    )}>
        <div className="flex flex-col gap-[8px]">
            <div className="flex flex-row text-[#B3BDC2] h-[13px]">
                <div
                    className={clsx("w-full")}>
                    Дата и время создания
                </div>
                <div>ФИО</div>
            </div>
            <div className="flex flex-row text-[#405866] h-[13px]">
                <div className={clsx("w-full")}>{arr[0][0]}</div>
                <div>{arr[0][1]}</div>
            </div>
        </div>
        <div className="flex flex-col gap-[8px]">
            <div className="flex flex-row text-[#B3BDC2] h-[13px]">
                <div
                    className={clsx("w-full")}>
                    Дата и время изменения
                </div>
                <div>ФИО</div>
            </div>
            {arr.slice(1).map(([date, whois], index) => {
                return <div key={index} className="flex flex-row text-[#405866] h-[13px]">
                    <div
                        className={clsx('w-full')}>
                        {date}
                    </div>
                    <div>{whois}</div>
                </div>
            })}
        </div>
        <div className="text-[#B3BDC2] h-[13px]">
            См. «Историю изменений» в карточке
        </div>
    </div>;
}

export const SettingFilters: React.FC = () => {

    const refCustomScrollbar = useRef(null);
    const [currPage, setCurrPage] = useState(dataPage.initialPage);

    /*Модальные окна*/
    const [isOpenModalHeaderFilters, setIsOpenModalHeaderFilters] = useState(false);
    const [isShowModalChangeFilterStatus, setIsShowModalChangeFilterStatus] = useState(false);
    const [isOpenModalFilterCardCreate, setIsOpenModalFilterCardCreate] = useState(false); // Открыть модальное окно для создания параметра
    const [isOpenModalFilterCardEdit, setIsOpenModalFilterCardEdit] = useState(false); // Открыть модальное окно для создания параметра
    const [isShowModalDeleteFilter, setIsShowModalDeleteFilter] = useState(false);

    /*Выбранные Индексы таблицы*/
    const [clickPos, setClickPos] = useState<{ col: number, row: number }>({col: 0, row: 0});

    const [isAnyRowSelected, setIsAnyRowSelected] = useState(false);
    const [isAllRowSelected, setIsAllRowSelected] = useState(false);

    const {
        setArrTable,
        setListGroups,
        setArrHeader,
        arrTable,
        arrHeader,
        setTableCell,
        arrSort,
        sortSwitch,
        listHeaderIndex,
        arrFilter
    } = useStoreSettingFilters(useShallow((s) => {
        return {
            setArrTable: s.setArrTable,
            setListGroups: s.setListGroups,
            setArrHeader: s.setArrHeader,
            arrTable: s.arrTable,
            arrHeader: s.arrHeader,
            setTableCell: s.setTableCell,
            arrSort: s.arrSort,
            sortSwitch: s.sortSwitch,
            listHeaderIndex: s.listHeaderIndex,
            arrFilter: s.arrFilter,
        }
    }));

    const clbHeader: ClbItemHandler = useCallback(({value, colIndex}) => {
        if (colIndex == 0) return <div className="py-[3px] px-[10px]">
            <Checkbox className="bg-white" checked={isAllRowSelected} onChange={(checked) => {

                for (let i = 0; i < arrTable.length; i++)
                    setTableCell(0, i, checked);

                setIsAnyRowSelected(checked);
                setIsAllRowSelected(checked);
            }}/>
        </div>

        return <HeaderCellDefault
            arrFilter={arrFilter}
            value={value} arrSort={arrSort} colIndex={colIndex}
            onClickSort={() => sortSwitch(colIndex)}
            onClickFilter={() => setIsOpenModalHeaderFilters(true)}
        />
    }, [isAllRowSelected, arrSort])

    const clbCell: ClbItemHandler = useCallback(({value, colIndex, rowIndex}) => {
        if (colIndex == 0) return <Checkbox
            checked={!!value}
            onChange={(checked: boolean, e) => {
                e.stopPropagation();
                setTableCell(colIndex, rowIndex, checked);

                setIsAnyRowSelected(checked ? true : arrTable.some((it, i) => i === rowIndex ? checked : it[0]));

                setIsAllRowSelected(arrTable.every((it, i) => i === rowIndex ? checked : it[0]));
            }}/>;
        if (colIndex == 6) return <CellStatus onClick={() => setIsShowModalChangeFilterStatus(true)} value={value}/>;
        if (colIndex == 3) return <Tooltip target={<StatusListChanged rowIndex={rowIndex}/>}>{value}</Tooltip>;
        if (colIndex == 4) return <Tooltip target={<StatusListChanged rowIndex={rowIndex}/>}>{value}</Tooltip>;
    }, [isAnyRowSelected, arrTable]);

    useEffect(() => {

        // if (arrTable) return;
        setArrHeader(mockSettingsArrHeader);
        setListGroups(mockSettingsListGroups);
        setArrTable(mockSettingsArrTable);

    }, []);

    let currValue = arrTable?.[clickPos.row]?.[clickPos.col];

    return (
        <div className="MKD min-h-screen">
            <div className="flex flex-col">
                {/* Меню управление */}
                <div className={clsx('flex px-[20px] py-[10px] items-center justify-between', 'h-[50px] gap-[10px]')}>


                    <Button color="blue" type="primary" size="M" onClick={() => {
                        setIsOpenModalFilterCardCreate(true);
                    }} iconRight={<IconPlus/>}>
                        Правило
                    </Button>
                    <div className="text-[#002033BF] text-[14px] w-full text-center">
                        НАСТРОЙКА И ФОРМИРОВАНИЕ ФИЛЬТРОВ
                    </div>

                    <Button type="primary" color="red" size="M" iconRight={<IconBucket/>}
                            disabled={!isAnyRowSelected}
                            onClick={() => setIsShowModalDeleteFilter(true)}>Удалить</Button>
                    {/*<Button type="secondary" color="green" size="M" onClick={null}>Экспорт</Button>*/}

                </div>

                {/* Таблица */}
                <div className={clsx('flex flex-row')}>
                    <Table
                        className={clsx('!w-[calc(100vw-20px)] !max-h-[808px]', 'ml-[20px]', 'custom_scrollbar_horizontal--hidden')}
                        arrTable={arrTable}
                        arrHeader={arrHeader}
                        clbStyleCell={() => clsx(
                            'pl-[10px] pr-[8px] text-[#002033BF]',
                            'border-b-[1px] border-[#0020331A]',
                            'content-center text-[11px] truncate'
                        )}
                        clbStyleRow={({rowIndex}) => {
                            return clsx(
                                "text-[#405866] hover:bg-[#F2F4F4] h-[32px] w-full",
                                !arrTable[rowIndex][listHeaderIndex['Статус']] && '[&>div]:text-[#B3BDC2]',
                                arrTable[rowIndex][0] && '[&>div]:bg-[#F0F9FF] hover:[&>div]:!bg-[#DDF1FC]'
                            );
                        }}
                        clbHeader={clbHeader}
                        clbCell={clbCell}
                        styleHeaderRow={'h-[40px] text-[11px] bg-[#F0F2F3]'}
                        arrWidthColumn={['32px', 'minmax(163px, 1fr)', '350px', '220px', '220px', '210px', '135px']}
                        ref={refCustomScrollbar}
                        onClickHeader={({colIndex}) => setClickPos(_ => ({..._, col: colIndex}))}
                        onClickCell={({e, rowIndex, colIndex}) => {
                            if (e.target == e.currentTarget) setIsOpenModalFilterCardEdit(true);
                            setClickPos(_ => ({col: colIndex, row: rowIndex}));
                        }}
                        arrColExcludes={[7, 8]} // Исключаем 7,8 - колонки
                    />
                    <div className="w-[20px]">
                        <CustomScrollbarVertical refreshTime={500}
                                                 targetRef={refCustomScrollbar}
                                                 classNameThumb="!w-[6px] rounded-[4px] !bg-[#D6DBDE]"
                                                 kDelta={1}
                        />
                    </div>
                </div>
                {/* Footer */}
                <div className={clsx(
                    "flex items-center justify-between mt-0 text-sm h-[42px] bg-white",
                    "px-[10px]"
                )}>
                    <div className="w-full"></div>

                    <div className="w-full justify-items-center">
                        <Pagination  {...dataPage} onPageChange={(page) => setCurrPage(page)}/>
                    </div>

                    <div className="flex flex-row text-[11px] text-[#00203399] justify-end text-nowrap w-full">
                        Отображаются записи
                        с {(currPage - 1) * dataPage.itemsPerPage + 1} по {(currPage) * dataPage.itemsPerPage} всего {dataPage.totalItems}
                    </div>
                </div>

            </div>

            <Modal show={isOpenModalFilterCardCreate}>
                <FilterCardCreate onHide={() => setIsOpenModalFilterCardCreate(false)}/>
            </Modal>

            <Modal show={isOpenModalFilterCardEdit}>
                <FilterCardEdit onHide={() => setIsOpenModalFilterCardEdit(false)} indexRow={clickPos.row}/>
            </Modal>

            <Modal show={isOpenModalHeaderFilters} onHide={() => setIsOpenModalHeaderFilters(false)}>
                <HeaderFilter store={useStoreSettingFilters} col={clickPos.col}
                              onHide={() => setIsOpenModalHeaderFilters(false)}
                              isSelectingColumns={false}/>
            </Modal>


            <ModalConfirm
                title={"СМЕНА СТАТУСА ФИЛЬТРА"}
                show={isShowModalChangeFilterStatus}
                onConfirm={() => {
                    setIsShowModalChangeFilterStatus(false);
                    debugger
                    setTableCell(clickPos.col, clickPos.row, !currValue)
                }}
                onCancel={() => setIsShowModalChangeFilterStatus(false)}

                textConfirm="Сменить"
                colorConfirm={currValue ? "green" : "gray"}
                iconConfirm={<IconCheck16 color={currValue ? undefined : '#006FBA'}/>}

                textCancel="Отменить"
                colorCancel="red"
                iconCancel={<IconCross16/>}

            >
                <div className="flex flex-row">
                    Сменить статус фильтра на&nbsp;
                    {<CellStatus onClick={() => setIsShowModalChangeFilterStatus(true)}
                                 value={currValue}/>}&nbsp;
                    ?
                </div>
            </ModalConfirm>

            <ModalConfirm
                title={"УДАЛЕНИЕ ФИЛЬТРА"}
                show={isShowModalDeleteFilter}
                onConfirm={() => {
                    setIsShowModalDeleteFilter(false);

                }}
                onCancel={() => setIsShowModalDeleteFilter(false)}

                textConfirm="Удалить"
                colorConfirm="red"
                iconConfirm={<IconCross16/>}

                textCancel="Вернуться"
                colorCancel="gray"
                iconCancel={<IconRefresh16/>}

            >
                Вы уверены, что хотите удалить фильтр? Удаленный фильтр восстановить будет невозможно.
            </ModalConfirm>

        </div>
    );
};
export default SettingFilters;