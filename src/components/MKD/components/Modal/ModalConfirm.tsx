import Modal from "@/components/MKD/components/Modal/Modal.tsx";
import clsx from "clsx";
import Button from "@/components/MKD/components/Button/Button.tsx";
import {IconRefresh16} from "@/components/MKD/components/Icons.tsx";
import React, {ReactNode} from "react";

const ModalConfirm = (props: {
    title: string;
    children: ReactNode;

    textConfirm: string;
    colorConfirm: "blue" | "gray" | "green" | "red";
    iconConfirm: ReactNode;

    textCancel?: string;
    colorCancel?: "blue" | "gray" | "green" | "red";
    iconCancel?: ReactNode;

    show: boolean,
    onConfirm: (e:any) => void,
    onCancel: (e:any) => void,
}) => <Modal show={props.show} onHide={props.onCancel}>
    <div
        role="modalcreate"
        className={clsx(
            "relative flex flex-col",
            "w-full max-w-[380px] h-[160px] rounded-[10px] p-[20px] gap-[20px]",
            "shadow-[0px_8px_16px_0px_#00203312]",
            "shadow-[0px_1px_1px_0px_#00203312]",
            "shadow-[0px_2px_2px_0px_#00203312]",
            "shadow-[0px_1px_1px_0px_#00203312]",
            "bg-white"
        )}>
        <div className="w-full h-[14px] text-center text-[12px] text-[#002033]">
            {props.title}
        </div>
        <div className="w-full h-[28px] text-left text-[12px] text-[#00203399]">
            {props.children}
        </div>
        <div className="flex flex-row justify-end gap-[10px]">
            <Button type="forModal" color={props.colorConfirm} size="M" iconLeft={props.iconConfirm} onClick={(e) => {
                props.onCancel(e);
                props.onConfirm(e);
            }}>
                {props.textConfirm}
            </Button>
            <Button type="forModal" color={props?.colorCancel ?? "gray"} size="M"
                    iconLeft={props?.iconCancel ?? <IconRefresh16/>}
                    onClick={(e)=>props.onCancel(e)}>
                {props?.textCancel ?? 'Вернуться'}
            </Button>
        </div>
    </div>
</Modal>;

export default ModalConfirm;