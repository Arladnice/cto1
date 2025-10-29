import React, {InputHTMLAttributes} from "react";
import clsx from "clsx";
import {IconZoom} from "@/components/MKD/components/Icons.tsx";

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    readonly?: boolean;
    required?: boolean;
    disabled?: boolean;
}

const InputSearch = ({error, readonly, required, disabled, ...rest}: InputSearchProps) => (
    <div
        className={clsx(
            "flex flex-row items-center",
            "w-[415px] h-[24px] gap-[5px] px-[6px] py-[2px] rounded-[2px]",
            "ring-1 ring-[#E6E9EB]",
            "hover:ring-[#B3D4EB]",
            "focus-within:ring-[#006FBA]",
            disabled && "bg-[#F9F9F9] ring-[#E6E9EB]",
            error && "!ring-[#EB5757]",
            readonly && "bg-[#FFFFFF] ring-[#E6E9EB]",
            required && "ring-[#E6E9EB]",
        )}
    >
        <input
            type="text"
            className={clsx(
                'w-full h-[20px] text-[11px] outline-none',
                'text-[#1A3747] placeholder:text-[#B3BDC2]',
            )}
            placeholder="Поиск"
            {...rest}
        />
        <IconZoom className=" " size={12}/>
    </div>
);

export default InputSearch;