import clsx from "clsx";
import Checkbox from "@/components/MKD/components/Checkbox/Checkbox.tsx";
import {MenuList} from "@/components/MKD/components/MenuList.tsx";
import {InputModalTextField} from "@/components/MKD/components/InputModalTextField.tsx";
import {ReactElement} from "react";

export type MiniTablePropsValueVariants = string | boolean | number;

export type MTArrData = (
    [string, MiniTablePropsValueVariants, string[], boolean[]] |
    [string, MiniTablePropsValueVariants, string[]] |
    [string, MiniTablePropsValueVariants]
    )[];

interface MiniTableProps {
    arrData: MTArrData;
    arrNameInputFields?: string[] | null;
    onChange?: (index: number, value: MiniTablePropsValueVariants, subIndex?: number) => void;
    editing?: boolean;
    creating?: boolean;
}

const MiniTable = ({
                       arrData,
                       arrNameInputFields = null,
                       onChange,
                       editing = false,
                       creating = false
                   }: MiniTableProps) => {
    const lastIndex = arrData.length - 1;

    return <div className={clsx('border-[#E5E9EB] border-[1px] rounded-[2px]', !editing && 'pointer-events-none')}>{
        arrData.map(([key, value, arrList, arrExcludedEdit], i) => {
            let valueComponent: string | number | boolean | ReactElement;
            let _editing = false;

            if (typeof value == "boolean") {
                valueComponent =
                    <div className="pl-[6px] pr-[4px] py-[2px]">
                        <Checkbox className="bg-white" checked={value} disabled={arrExcludedEdit?.[i] ?? null}
                                  onChange={(checked) => onChange && onChange(i, checked)}/>
                    </div>
                _editing = arrExcludedEdit?.[i] ? false : editing;
            } else if (Array.isArray(arrList)) {
                valueComponent = <MenuList
                    className="h-[28px] w-full bg-transparent" arrList={arrList}
                    value={value + ''}
                    onChange={(index, value) => onChange && onChange(i, value, index)}
                    border={false} error={false} disabled={false}
                    hideIconArrow={!editing}
                />
                _editing = arrExcludedEdit?.[i] ? false : editing;
            } else if (arrNameInputFields && arrNameInputFields.includes(key)) {
                valueComponent = <InputModalTextField
                    value={value + ''}
                    className={clsx(
                        "h-[27px] !outline-0 disabled:!bg-white",
                        !editing && 'pointer-events-none'
                    )}
                    onChange={(value: string) => onChange && onChange(i, value)}
                />
            } else {
                valueComponent = <div className="pl-[6px] pr-[4px] py-[2px]">{value}</div>
            }

            return (
                <div key={i}
                     role="minitablerow"
                     className={clsx(
                         'flex flex-row w-full max-w-[700px] h-[28px]',
                     )}>
                    <div
                        role="minitablekey"
                        className={clsx(
                            'flex flex-row w-full max-w-[290px] h-full max-h-[28px] min-h-[24ox] px-[10px] py-[8px] gap-[5px]',
                            'text-[#00203399] text-[11px] items-center',
                            'bg-[#F9F9F9] border-[#E5E9EB]',
                            i != lastIndex && 'border-b-[1px]',
                            'border-r-[1px]',
                        )}
                    >
                        {key}
                    </div>
                    {<div
                        role="minitablevalue"
                        className={clsx(
                            // !creating && _editing && "bg-[#F0F9FF]",
                            // creating && _editing && "bg-white",
                            arrExcludedEdit?.[i] && "bg-white",
                            !creating && !_editing && (!(arrExcludedEdit?.[i] ?? false)) ? "bg-white" : "bg-[#F0F9FF]",
                            'flex flex-row w-full max-w-[410px] h-full max-h-[28px] min-h-[24ox] ',
                            'border-[#E5E9EB] text-[#1A3747] text-[11px] items-center',
                            i != lastIndex && 'border-b-[1px]',
                        )}>
                        {valueComponent}
                    </div>}
                </div>)
        })}</div>
};

export default MiniTable;