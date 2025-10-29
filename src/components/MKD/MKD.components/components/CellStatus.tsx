import clsx from "clsx";
import React from "react";

function CellStatus(props: { onClick: (e: any) => void, value: string | number | boolean }) {
    return <div
        onClick={(e: any) => props.onClick(e)}
        className={clsx(
            'w-[75px] h-[19px] rounded-[6px] px-[10px] py-[4px] ',
            'text-[9px] text-center text-white',
            'cursor-pointer',
            props.value ? 'bg-[#24C38E]' : 'bg-[#CFDAE2]'
        )}>{(props.value ? "" : 'НЕ') + 'АКТИВЕН'}</div>;
}

export default CellStatus;