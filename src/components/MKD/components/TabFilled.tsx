import React from "react";
import clsx from "clsx";


const STYLE_TAB_FILLED = {
    primary: {
        parent: {
            def: 'text-[#73858F] bg-white thin-border group outline-[#E6E9EB] [&_path]:stroke-[#73858F]',
            hover: 'hover:outline-[#B3D4EB] hover:text-[#006FBA] hover:[&_path]:stroke-[#006FBA]',
            pressed: 'active:bg-[#006FBA] active:outline-[#DDF1FC] active:text-white active:[&_path]:stroke-white',
            active: '!bg-[#006FBA] !outline-[#DDF1FC] !text-white ![&_path]:stroke-white',
            disabled: 'bg-white outline-[#E6E9EB] text-[#E6E9EB] [&_path]:stroke-[#E6E9EB]',
        },
        counter: {
            def: "bg-[#006FBA] text-white",
            pressed: 'group-active:bg-transparent',
            active: '!bg-transparent',
            disabled: "bg-[#E6E9EB] text-white",
        }
    },
    secondary: {
        parent: {
            def: 'text-[#73858F] bg-white thin-border group outline-[#E6E9EB] [&_path]:stroke-[#73858F]',
            hover: 'hover:outline-[#B3D4EB] hover:text-[#006FBA] hover:[&_path]:stroke-[#006FBA]',
            pressed: 'active:bg-[#D0EDFD] active:outline-[#DDF1FC] text-[#006FBA]',
            active: '!bg-[#D0EDFD] !outline-[#DDF1FC] !text-[#006FBA]',
            disabled: 'bg-white outline-[#E6E9EB] text-[#E6E9EB] [&_path]:stroke-[#E6E9EB]',
        },
        counter: {
            def: "bg-[#DDF1FC] text-[#73858F]",
            pressed: 'group-active:bg-transparent text-[#006FBA]',
            active: '!bg-transparent !text-[#006FBA]',
            disabled: "bg-[#E6E9EB] text-white",
        }
    }
}

const TabFilled = (props: {
    title?: string;
    icon?: React.ReactElement;
    counter?: number;
    active?: boolean;
    disabled?: boolean;
    type?: "primary" | "secondary";
    onClick?: () => void;
    className?: string;
}) => {
    const type = props?.type ?? 'primary'

    return <div
        className={clsx(
            'flex flex-row h-[28px] py-[4px] gap-[8px] rounded-[6px] select-none',
            'items-center text-[11px] justify-between',
            props?.counter != null ? 'pr-[5px]' : 'pr-[15px]',
            props.icon ? 'pl-[10px]' : 'pl-[15px]',

            STYLE_TAB_FILLED[type].parent.def,
            !props.disabled && STYLE_TAB_FILLED[type].parent.hover,
            !props.disabled && STYLE_TAB_FILLED[type].parent.pressed,
            props.disabled && STYLE_TAB_FILLED[type].parent.disabled,

            props.active && STYLE_TAB_FILLED[type].parent.active,

            props.className,
        )}
        onClick={props?.onClick}
    >
        {props.icon}
        <div className="group-active:bg-transparent truncate">{props.title}</div>
        {props?.counter != null &&
            <div className={clsx(
                "px-[10px] h-[18px] rounded-[6px] text-center items-center content-center",
                STYLE_TAB_FILLED[type].counter.def,
                !props.disabled && STYLE_TAB_FILLED[type].counter.pressed,
                props.disabled && STYLE_TAB_FILLED[type].counter.disabled,

                props.active && STYLE_TAB_FILLED[type].counter.active,
            )}>{props?.counter ?? ''}
            </div>}
    </div>;
}

export default TabFilled;