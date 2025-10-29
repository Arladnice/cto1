import clsx from "clsx";
import {IconChevronLeft, IconChevronRight} from "../Icons.tsx";
import {MONTH_NAMES_SHORT} from "./local.ts";
import React, {FC, memo} from "react";
import {DataRangeProps} from "./datePicker.types.ts";

interface SwitchDateHeaderProps extends React.HTMLProps<HTMLElement> {
    onPrev: () => void;
    onNext: () => void;
    onAction?: () => void;
}

const SwitchDateHeader: FC<SwitchDateHeaderProps> = ({onPrev, onNext, onAction, children}) =>
    <header className={clsx(
        "flex items-center justify-between",
        "h-[28px]"
    )}>
        <button
            onClick={onPrev}
            className="h-[28px] w-[28px] justify-items-center">
            <IconChevronLeft/>
        </button>
        <div

            className="text-[11px] cursor-pointer"
            onClick={onAction}
        >
            {children}
        </div>
        <button
            onClick={onNext}
            className="h-[28px] w-[28px] justify-items-center"
        >
            <IconChevronRight/>

        </button>
    </header>;

export default memo(SwitchDateHeader);