import clsx from "clsx";
import {
    IconCheck16,
    IconCross,
    IconCross16,
    IconGEO, IconInfo12,
    IconNetwork,
    IconPast,
    IconWrite
} from "@/components/MKD/components/Icons.tsx";
import Button from "@/components/MKD/components/Button/Button.tsx";
import React, {useCallback, useEffect, useState} from "react";
import MiniTable, {MTArrData} from "@/components/MKD/MKD.components/components/Modals/Parameter/MiniTable.tsx";
import ModalConfirm from "@/components/MKD/components/Modal/ModalConfirm.tsx";
import {useShallow} from "zustand/react/shallow";
import {useStoreArchive} from "@/components/MKD/stores/stores.ts";

interface HeaderParams {
    title: string;
    onClickEdit: () => void;
    editing: boolean;
}

function Header({title, onClickEdit, editing = false}: HeaderParams) {

    return <div
        role="h2arhive"
        className={clsx(
            "flex flex-row w-full max-w-[1420px] h-[28px] pl-[180px] gap-[20px]",
            "justify-center items-center",
        )}>
        <div
            className={clsx("w-full max-w-[1082px] h-[14px] text-[12px] text-center justify-center")}>
            {title ?? 'НАЗВАНИЕ ПАРАМЕТРА'}
        </div>
        <Button
            className={clsx("w-[138px] h-[28px]", editing && 'invisible')}
            type="primary" color="blue" size="M" iconRight={<IconWrite/>}
            onClick={onClickEdit}>Редактировать</Button>
    </div>;
}

interface ParameterParams {
    arrRow?: any[];
    title: string;
    onChange: (data: any) => void;
    onHide: () => void;
    creating: boolean;
}

const Parameter = ({arrRow: _arrRow = null, creating, onChange, onHide, title}: ParameterParams) => {
    const [editing, setEditing] = useState(creating);

    const [isShowModalApply, setIsShowModalApply] = useState(false)
    const [isShowModalCancel, setIsShowModalCancel] = useState(false)

    const {
        listHeader, listGroups,
        getListFilter,
        listFilter,
        listHeaderIndex,
        listQuality
    } = useStoreArchive(
        useShallow((state) => ({
            setArrTableItem: state.setTableCell,
            arrTable: state.arrTable,
            listHeader: state.arrHeader,
            listGroups: state.listGroups,
            getListFilter: state.getListFilter,
            listFilter: state.listFilter,
            listHeaderIndex: state.listHeaderIndex,
            listQuality: state.listQuality,
        }))
    );

    const arrHeader = Object.entries(listHeader)

    const [arrRow, setArrRow] = useState(_arrRow ?? []);// Клонируем элемент для манипуляций

    useEffect(() => {
        if (arrRow?.[0]) (async () => await getListFilter(arrRow[1]))();
    }, [])

    const arrListHeaderFilter = [
        'Достоверный диапазон',
        'Полнота поставки',
        'Последовательность состояния',
        'Потеря сигнала',
        'Соблюдение интервалов',
        'Состояние тех. оборудования', 'Статус поверки'
    ];

    // const table1: MTArrData = arrHeader.slice(2, 2 + 7).map(([index, name]) => [name, arrRow[index] ?? '', listGroups?.[name] ?? null]);
    // const table2: MTArrData = arrHeader.slice(9, 9 + 13).map(([index, name]) => [name, arrRow[index] ?? '', listGroups?.[name] ?? null]);
    // const table3: MTArrData = arrHeader.slice(22, 22 + 2).map(([index, name]) => [name, arrRow[index] ?? '', listGroups?.[name] ?? null]);
    const table1: MTArrData = [
        'Параметр', 'Дочернее общество', 'Месторождение', 'Объект', 'Участок, блок, пл. объект',
        'Технологическая позиция', 'Тех. поз. согласно проекта', 'Цех'
    ].map((name) => [name, arrRow[listHeaderIndex[name]] ?? '', listGroups?.[name] ?? null]);
    const table2a: MTArrData = [
        'Сервисная организация', '№ Договора', 'Тип СИ/СА', 'Заводской номер СИ/СА', 'Тип сигнала',
        'Группа СИ/СА', 'Уровень критичности', 'Ожидаемые сигналы'
    ].map((name) => [name, arrRow[listHeaderIndex[name]] ?? '', listGroups?.[name] ?? null]);

    const table2b: MTArrData = [
        'Общее кол-во сигналов',
        'Качественные сигналы',
        'Некачественные сигналы',
        'Сбои за предыдущие',
    ].map((name) => [name, listQuality[arrRow[1]]?.[listHeaderIndex[listHeaderIndex[name]]], null]);
    const table2 = [...table2a, ...table2b];
    // debugger
    const table3: MTArrData = [
        'Тег сигнала в системе МКД', 'Коментарий обсл. орг.'
    ].map((name) => [name, arrRow[listHeaderIndex[name]] ?? '', listGroups?.[name] ?? null], [true, true]);
    const table4: MTArrData = arrListHeaderFilter.map((name) => [name, listFilter?.[arrRow?.[1] ?? 0]?.includes?.(name) ?? false, null, [true, true, true, true, true, true, true]]);

    const onChangeTemp = useCallback((index: number, value: any) => {
        setArrRow((row: any[]) => {
            const _row = [...row];
            _row[index] = value;
            return _row;
        })
    }, [])

    return (
        <div
            role="dialogparameter"
            className={clsx(
                "relative flex flex-col",
                "w-full max-w-[1460px] h-[759px] rounded-[10px] p-[20px] pt-[35px] gap-[50px]",
                "shadow-[0px_8px_16px_0px_#00203312]",
                "shadow-[0px_1px_1px_0px_#00203312]",
                "shadow-[0px_2px_2px_0px_#00203312]",
                "shadow-[0px_1px_1px_0px_#00203312]",
                "bg-white",
            )}>

            {/*close dialog*/}
            <div className="absolute top-[8px] right-[8px]" onClick={() => {
                !editing ? onHide() : setIsShowModalCancel(true);
            }}>
                <IconCross className={clsx(
                    `hover:[&>svg>path]:stroke-[#71848e]`,
                    `active:[&>svg>path]:stroke-[#444f55]`
                )}/>
            </div>

            {/*content*/}
            <div role="content"
                 className={clsx("flex flex-col w-full max-w-[1420px] h-[616px] gap-[20px]")}>
                {/*H2 Archive*/}
                <Header title={title} onClickEdit={() => setEditing(!editing)} editing={editing}/>
                <div role="body"
                     className={clsx("relative", "flex flex-row w-full max-w-[1420px] h-[568px] gap-[20px]")}>
                    <div role="columnleft"
                         className={clsx("flex flex-col w-full max-w-[700px] h-[568px]")}>

                        <div
                            className={clsx("flex w-full max-w-[700px] h-[28px] px-[10px] py-[10px] gap-[10px] items-center text-[9px]")}>
                            <IconGEO size={12}/>
                            <div className="text-[9px] h-[9px]">ТЕХНИЧЕСКОЕ ПОЛОЖЕНИЕ</div>
                        </div>
                        <MiniTable editing={editing} creating={creating}
                                   arrData={table1}
                                   onChange={(index, value) => onChangeTemp(index + 2, value)}/>
                        <div
                            className={clsx("flex w-full max-w-[700px] h-[28px] px-[10px] py-[10px] gap-[10px] items-center text-[9px]")}>
                            <IconPast size={12}/>
                            <div className="h-[9px]">ПРИДУМАТЬ НАЗВАНИЕ</div>
                        </div>
                        <MiniTable editing={editing} creating={creating} arrData={table2}
                                   arrNameInputFields={creating && ['№ Договора', 'Заводской номер']}
                                   onChange={(index, value) => onChangeTemp(index + 9, value)}/>
                    </div>
                    <div role="columnright"
                         className={clsx("flex flex-col w-full max-w-[690px] h-[568px]")}>

                        <div
                            className={clsx("flex w-full max-w-[690px] h-[28px] px-[10px] py-[10px] gap-[10px] items-center text-[9px]")}>
                            <IconInfo12 size={14} color="#006FBA"/>
                            <div className="h-[9px]">ОСТАЛЬНАЯ ИНФОРМАЦИЯ</div>
                        </div>
                        <MiniTable editing={editing} creating={creating} arrData={table3}
                                   onChange={(index, value) => onChangeTemp(index + 22, value)}/>

                        <div
                            className={clsx("flex w-full max-w-[690px] h-[28px] px-[10px] py-[10px] gap-[10px] items-center text-[9px]")}>
                            <IconNetwork size={12}/>
                            <div className="h-[9px]">СИГНАЛ АЛГОРИТМОВ АНАЛИЗА</div>
                        </div>
                        <MiniTable editing={editing} creating={creating} arrData={table4}
                                   onChange={(index, value) => onChangeTemp(index + 22, value)}/>
                    </div>

                </div>
            </div>

            {/*buttons*/}
            <div
                role="buttons"
                className={clsx("flex flex-row justify-end w-full max-w-[1420px] h-[38px] gap-[10px]")}>
                {!editing &&
                    <Button type="forModal" color="gray" size="M" iconLeft={<IconCross16/>} onClick={onHide}>
                        Закрыть
                    </Button>}
                {editing && <>
                    <Button type="forModal" color="green" size="M" iconLeft={<IconCheck16/>}
                            onClick={() => setIsShowModalApply(true)}>
                        {creating ? 'Создать' : 'Сохранить'}
                    </Button>
                    <Button type="forModal" color="gray" size="M" iconLeft={<IconCross16/>}
                            onClick={() => setIsShowModalCancel(true)}>
                        Закрыть
                    </Button>
                </>}

                {/* Модальные диалоги (Сохранение/Закрыть Уверены?) */}
                <ModalConfirm
                    title={creating ? "СОЗДАТЬ ЕДЕНИЦУ ОБОРУДОВАНИЯ" : "СОХРАНИТЬ ИЗМЕНЕНИЯ"}
                    textConfirm={creating ? "Создать" : "Сохранить"}
                    show={isShowModalApply}
                    onConfirm={() => {
                        onHide();
                        onChange && onChange(arrRow); // Сохранение изменений
                    }}
                    onCancel={() => setIsShowModalApply(false)}
                    colorConfirm={"green"}
                    iconConfirm={<IconCheck16/>}
                >
                    {creating ? "Вы уверены, что хотите создать и сохранить все внесенные вами данные?" : "Вы уверены, что хотите сохранить все внесенные вами изменения?"}
                </ModalConfirm>

                <ModalConfirm
                    title={"ЗАКРЫТЬ БЕЗ ИЗМЕНЕНИЙ"}
                    textConfirm={"Закрыть"}
                    show={isShowModalCancel}
                    onConfirm={() => onHide()}
                    onCancel={() => setIsShowModalCancel(false)}
                    colorConfirm={"red"}
                    iconConfirm={<IconCross16/>}
                >
                    {"Вы уверены, что хотите закрыть окно? Все внесенные изменения будут отменены."}
                </ModalConfirm>

            </div>
        </div>);
};

export default Parameter;