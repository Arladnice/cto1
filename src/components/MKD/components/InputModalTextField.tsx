import clsx from "clsx";
import Tooltip from "@/components/MKD/components/Tooltip.tsx";
import {IconInfo12} from "@/components/MKD/components/Icons.tsx";
import {MenuList} from "@/components/MKD/components/MenuList.tsx";
import {ReactNode} from "react";

interface InputModalParams {
    value?: string | ReactNode;
    label?: string;
    placeholder?: string;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    error?: string;
    hint?: string;
    blueEditMode?: boolean;
    isInput?: boolean;
    isNumber?: boolean;
    arrList?: string[];
    onChange?: ((index: number, value: string) => void) | ((value: string) => void);
    className?: string;
    widthFit?: boolean;
}

export const InputModalTextField = (props: InputModalParams) => <InputBase {...{...props, isInput: true}}/>
export const InputModalSelect = (props: InputModalParams) => <InputBase {...{...props, isInput: false}}/>

type OnChangeDropList = (index: number, value: string) => void;
type OnChangeInput = (value: string) => void;

const InputBase = (props: {
    value?: string | ReactNode,
    label?: string,
    placeholder?: string,
    required?: boolean,
    readOnly?: boolean,
    disabled?: boolean,
    error?: string,
    hint?: string;
    blueEditMode?: boolean,
    isInput?: boolean,
    isNumber?: boolean,
    arrList?: string[],
    onChange?: OnChangeDropList | OnChangeInput,
    className?: string,
    widthFit?: boolean,
}) => <div role="inputmodaltextfield"
           className={clsx("relative w-full flex flex-col gap-[3px]")}>

    {props.label &&
        <div role="label"
             className={clsx(
                 "flex flex-row items-center gap-[5px]",
                 "w-full h-[17px] py-[2px] px-[6px] text-[#667985]")}>
            <div className="text-[11px]">{props.label + (props.required ? ' *' : '')}</div>
            {props.hint && <Tooltip dir="right" target={
                <div
                    className="px-[10px] pt-[6px] pb-[7px] text-[11px] rounded-[6px] bg-white shadow-[0px_2px_5px_0px_#00203326]">
                    {props.hint}
                </div>
            }>
                <IconInfo12/>
            </Tooltip>}
        </div>}

    {props.isInput
        ? <input type={props?.isNumber ? 'number' : 'text'} placeholder={props.placeholder} className={clsx(
            "w-full h-[24px]  py-[2px] px-[6px] rounded-[2px] truncate",
            props.blueEditMode ? "bg-[#F0F9FF]" : "bg-white",
            "text-[#1A3747] placeholder:text-[#B3BDC2]",
            "thin-border outline-[#E6E9EB]",
            "hover:outline-[#B3D4EB]",
            "focus:outline-[#006FBA]",
            "disabled:outline-[#E6E9EB] disabled:bg-[#F9F9F9]",
            props?.error && "outline-[#EB5757]",
            !props.blueEditMode && props?.readOnly && "outline-[#E6E9EB] !bg-[#FFFFFF]",
            props.className
        )}
                 disabled={!props.blueEditMode && (props.disabled || props?.readOnly)}
                 value={(props?.value as string) ?? ''}
                 onChange={(e) => (props.onChange as (value: string) => void)(e.target.value)}
        />
        : <MenuList
            placeholder={props.placeholder}
            arrList={props.arrList}
            value={props.value as ReactNode}
            onChange={props.onChange as OnChangeDropList}
            className={props.className}
            widthFit={props.widthFit}
        />
    }

    {props.error && <div className="absolute bottom-[-14px] h-[11px] text-[9px] text-[#EB5757]">{props.error}</div>}
</div>;