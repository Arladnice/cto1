import clsx from "clsx";
import {IconAsc, IconDesc, IconFilter, IconUnsorted} from "@/components/MKD/components/Icons.tsx";
import React from "react";
import {Sorting} from "@/components/MKD/stores/slices/filterSortSlice.ts";

const listIconSort = {
    null: <IconUnsorted color="#0020334D" size={8}/>,
    undefined: <IconUnsorted color="#0020334D" size={8}/>,
    unsorted: <IconUnsorted color="#0020334D" size={8}/>,
    asc: <IconAsc color="#006FBA" size={8}/>,
    desc: <IconDesc color="#006FBA" size={8}/>
}


const HeaderCellDefault = (props: {
    value: string | number | boolean,
    onClickSort: () => void,
    arrSort: Sorting[],
    arrFilter: any[],
    colIndex: number,
    onClickFilter: () => void,
    hideSort?: boolean,
    hideFilter?: boolean,
    onAdditionalAction?: () => void,
}) => {
    return <div className="contents select-none" onClick={(e) => {
        if (e.ctrlKey && e.shiftKey) {
            props.onAdditionalAction && props.onAdditionalAction()
        }
    }}>
        <div className="pl-[10px] pr-[5px]">{props.value}</div>

        {/*button filters*/}
        <div className={clsx("flex flex-row items-center",
            (!props.hideSort || !props.hideFilter) && 'pr-[5px]'
        )}>
            {!props.hideSort && (
                <div className={clsx(
                    "justify-items-center-safe content-center w-[16px] h-[16px] cursor-pointer",
                    "hover:bg-[#E6E9EB] active:bg-[#D9DEE1]"
                )} onClick={props.onClickSort}>
                    {listIconSort[props.arrSort[props.colIndex]]}
                </div>)}
            {!props.hideFilter && <div className={clsx(
                "justify-items-center-safe content-center w-[16px] h-[16px] cursor-pointer",
                "hover:bg-[#E6E9EB] active:bg-[#D9DEE1]"
            )}
                                       onClick={props.onClickFilter}>
                <IconFilter color={props?.arrFilter?.[props.colIndex] ? "#006FBA" : "#0020334D"} size={8}/>
                {/*<IconFilter color="#0020334D" size={8}/>*/}
            </div>}
        </div>
    </div>;
}


export default HeaderCellDefault;