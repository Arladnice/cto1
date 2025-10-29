import React, {useState} from 'react';
import clsx from "clsx";
import {
    IconAsc,
    IconChevronDown,
    IconChevronUp,
    IconColumn,
    IconCross,
    IconDesc,
    IconUnsorted
} from "@/components/MKD/components/Icons.tsx";
import InputSearch from "@/components/MKD/components/InputSearch.tsx";
import Button from "@/components/MKD/components/Button/Button.tsx";
import ListItem from "@/components/MKD/components/ListItem/ListItem.tsx";
import Modal from "@/components/MKD/components/Modal/Modal.tsx";
import {ExtractState, StoreApi} from "zustand/vanilla";
import {useShallow} from "zustand/react/shallow";
import {Sorting} from '@/components/MKD/stores/slices/filterSortSlice.ts';


const SortButtonRadio = (props: {
    sort: Sorting,
    onSorted: (sorting: Sorting) => void,
}) => <div className="flex flex-row">
    <Button
        className="!p-0 !w-[24px] !h-[24px] !rounded-[2px]"
        type={(props?.sort ?? "unsorted") == "unsorted" ? "secondary" : "subtle"}
        color="blue" size="S"
        onClick={() => props.onSorted("unsorted")}>
        <IconUnsorted
            color={(props?.sort ?? "unsorted") == "unsorted" ? "#006FBA" : "#B3BDC2"}
            isInheritStyle={false}
            size={8}/>
    </Button>
    <Button
        className="!p-0 !w-[24px] !h-[24px] !rounded-[2px]"
        type={props.sort == "desc" ? "secondary" : "subtle"}
        color="blue" size="S"
        onClick={() => props.onSorted("desc")}>
        <IconDesc color={props.sort == "desc" ? "#006FBA" : "#B3BDC2"} size={8}
                  isInheritStyle={false}
        />
    </Button>
    <Button
        className="!p-0 !w-[24px] !h-[24px] !rounded-[2px]"
        type={props.sort == "asc" ? "secondary" : "subtle"}
        color="blue" size="S"
        onClick={() => props.onSorted("asc")}>
        <IconAsc color={props.sort == "asc" ? "#006FBA" : "#B3BDC2"} size={8}
                 isInheritStyle={false}
        />
    </Button>
</div>;

const SelectorColumn = (props: {
    store: {
        (): ExtractState<StoreApi<any>>,
        <U>(selector: (state: ExtractState<StoreApi<any>>) => U): U
    } & StoreApi<any>,
}) => {

    const {_arrHeader, arrIncludedColumn, setIncludeColumn} = props.store(useShallow((s) => ({
        _arrHeader: s.arrHeader,
        arrIncludedColumn: s.arrIncludedColumn,
        setIncludeColumn: s.setIncludeColumn
    })));

    const arrHeader = [..._arrHeader];
    arrHeader[0] = 'Отметка'

    return <div className={clsx(
        "relative left-[-368px]",
        "flex flex-col",
        "w-[265px] h-[611px] rounded-[10px] ",
        "py-[10px] gap-[4px]",
        "shadow-[0px_2px_5px_0px_#00203326]",
        "bg-white",
    )}>
        {/*header*/}
        <h1 className="mx-[20px] h-[25px] p-[6px] text-[12px] text-center">ОТОБРАЖЕНИЕ КОЛОНОК</h1>
        <div className="mx-[20px] h-[16px] justify-items-center hover:bg-[#00203308]"><IconChevronUp/></div>
        <div className={clsx(
            "flex flex-col ml-[20px] mr-[10px] pr-[7px] h-[522px] gap-[6px]",
            "overflow-auto",
            "",
        )}>

            {arrHeader.map((item: string, index: React.Key) => {
                return (
                    <ListItem key={index} className={clsx('!h-[16px]')}
                              checked={(arrIncludedColumn as boolean[])[index as number]}
                              onChange={(checked) => setIncludeColumn(index, checked)}>
                        {item}
                    </ListItem>
                )
            })}

        </div>
        <div className="mx-[20px] h-[16px] justify-items-center hover:bg-[#00203308]"><IconChevronDown/></div>
    </div>;
};

interface FilterProps {
    onHide: () => void;
    col: number;
    store: {
        (): ExtractState<StoreApi<any>>,
        <U>(selector: (state: ExtractState<StoreApi<any>>) => U): U
    } & StoreApi<any>,
    isSelectingColumns?: boolean;
}

const HeaderFilter = ({
                          store,
                          onHide,
                          col,
                          isSelectingColumns = true
                      }: FilterProps) => {

    // const [sorting, setSorting] = useState<Sorting>(sort)
    const [isOpenModalColumns, setIsOpenModalColumns] = useState(false);
    const [arrSort, setArrSort] = useState([]);

    const {
        arrHeader,
        // arrSort,
        // setArrSort,
        listGroups,
        arrFilter,
        setFilter,
    } = store(useShallow((s) => {
        return {
            arrHeader: s.arrHeader,
            arrSort: s.arrSort,
            setArrSort: s.setArrSort,
            listGroups: s.listGroups,
            arrFilter: s.arrFilter,
            setFilter: s.setFilter,
        }
    }));

    const [findFilter, setFindFilter] = useState('');
    const [strFilter, setStrFilter] = useState(arrFilter?.[col] ?? '');


    const nameColumn = arrHeader?.[col] ?? [];
    let arrVariantsValues: string[] = listGroups?.[nameColumn] ?? [];

    if (arrSort[col] == 'asc') {
        arrVariantsValues = [...arrVariantsValues].sort((a, b) => b.localeCompare(a))
    }
    if (arrSort[col] == 'desc') {
        arrVariantsValues = [...arrVariantsValues].sort((a, b) => a.localeCompare(b))
    }
    if (findFilter) {
        arrVariantsValues = arrVariantsValues.filter(it => it.toLocaleLowerCase().includes(findFilter.toLowerCase()));
    }

    return (
        <div
            role="dialogfilter"
            className={clsx(
                // 'relative',
                'w-[455px] h-[443px] rounded-[10px] p-[20px]',
                'shadow-[0px_2px_5px_0px_#00203326]',
                'bg-white',
            )}>
            {/*close dialog*/}
            <div className="relative">
                <div className="absolute top-[-8px] right-[-8px]" onClick={() => onHide()}>
                    <IconCross className={clsx(
                        `hover:[&>svg>path]:stroke-[#71848e]`,
                        `active:[&>svg>path]:stroke-[#444f55]`
                    )}/>
                </div>
            </div>

            <div className={clsx('flex flex-col gap-[30px]',)}>

                <div className={clsx('flex flex-col w-[415px] h-[345px] gap-[15px] ')}>

                    {/*header*/}
                    <h1 className="h-[14px] text-[12px] text-center">{nameColumn}</h1>

                    {/*search*/}
                    <InputSearch value={findFilter} onChange={(e) => {
                        setFindFilter(e.target.value)
                    }}/>

                    {/*header controls*/}
                    <div className={clsx('flex flex-col', 'w-[415px] h-[282px] gap-[10px]')}>

                        <div className={clsx(
                            'flex flex-row justify-between',
                            'w-[415px] h-[32px] p-[4px] gap-[1px]',
                            'border-b-[1px] border-[#E6E9EB]',
                        )}>

                            {/*selection control*/}
                            <div className="flex flex-row gap-[1px]">
                                <Button
                                    className='!w-[96px] text-nowrap'
                                    type='subtle'
                                    color='blue'
                                    size='S'
                                    onClick={() => setStrFilter(arrVariantsValues.join(';'))}
                                >
                                    Выбрать все
                                </Button>
                                <Button
                                    className="!w-[96px]" type="subtle" color="gray" size="S"
                                    onClick={() => setStrFilter('')}>
                                    Сбросить
                                </Button>
                            </div>

                            {/*sorting*/}
                            <SortButtonRadio
                                sort={arrSort?.[col]}
                                onSorted={(sorting) => {
                                    setArrSort((prev) => {
                                        const _arr = [...prev];
                                        _arr[col] = sorting;
                                        return _arr;
                                    })
                                    // setArrSort(col, sorting)
                                    // setSorting(sorting);
                                    // onFilter({sorting, col});
                                }}/>
                        </div>

                        <div className={clsx(
                            'flex flex-col w-full h-[240px] pr-0 pl-[2px]',
                            'overflow-auto'
                        )}>
                            {arrVariantsValues.map((item, index) =>
                                <ListItem key={index} checked={strFilter.includes(item)}
                                          onChange={(val) => {
                                              setStrFilter((now: string) => {
                                                  let res: string = '';

                                                  res = val ? (now + ';' + item) : now?.replace(item, '');
                                                  res = (res == ';' ? '' : res);
                                                  res = res.replaceAll(/;;/g, ';') ?? '';
                                                  res = res.replaceAll(/^;/g, '');

                                                  return res;
                                              })
                                          }}
                                >{item}</ListItem>)}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between">
                    <Button onClick={() => setIsOpenModalColumns(true)} type="secondary" color="gray"
                            className={clsx("!p-[6px] !w-[28px]", !isSelectingColumns && 'invisible')}>
                        <IconColumn size={13}/>
                    </Button>
                    <div className="flex flex-row items-center justify-between gap-[10px]">
                        <Button onClick={() => {
                            onHide();
                            setFilter(col, strFilter);
                        }} type="secondary" color="blue">Применить</Button>
                        <Button onClick={() => {
                            onHide()
                        }} type="secondary" color="gray">Отменить</Button>
                    </div>
                </div>
            </div>

            <Modal show={isOpenModalColumns} onHide={() => setIsOpenModalColumns(false)} backgroundColor="#00000000">
                <SelectorColumn store={store}/>
            </Modal>

        </div>
    );
}


export default HeaderFilter;