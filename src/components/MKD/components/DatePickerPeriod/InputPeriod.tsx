import React, { useState } from 'react';
import clsx from 'clsx';
import { IconCalendar } from '../Icons.tsx';
import { DataRangeProps, DateRange } from './datePicker.types.ts';
import DayPickerPeriod from './DayPickerPeriod.tsx';
import { formatDateTime } from './utils.ts';

const InputPeriod = ({
    value,
    onChange,
    onConfirm,
    onCancel,
    isFillingAnimate = false,
    singleDate = false,
    isHideButtons = false,
}: DataRangeProps) => {
    const [_value, set_value] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const v = isOpen ? _value : value;
    let from = formatDateTime(v?.from, 'dd.mm.yyyy');
    let to = formatDateTime(v?.to, 'dd.mm.yyyy');
    return (
        <div className={clsx('relative cursor-pointer')}>
            <div
                className={clsx(
                    'flex flex-row items-center',
                    singleDate ? 'h-[28px] w-[100px]' : 'h-[28px] w-[180px]',
                    'gap-[5px] rounded-[6px] py-[4px] pr-[4px] pl-[8px] text-[11px]',
                    'border-[1px]',
                    'border-[#0020331A] bg-[#EBF4FA4D] text-[#00203399]',
                    'hover:border-[#B3D4EB] hover:bg-[#FFFFFF] hover:text-[#1A3747]',
                    isOpen ? '!border-[#006FBA] !text-[#1A3747]' : ''
                )}
                onClick={() => {
                    set_value(value);
                    setIsOpen(true);
                }}
            >
                <div className={clsx('h-[14px] w-[147px]')}>{singleDate ? from : `${from} - ${to}`}</div>
                <IconCalendar size={12} />
            </div>
            {isOpen && (
                <div
                    className='fixed top-0 left-0 z-10 h-screen w-screen opacity-0'
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
            {isOpen && (
                <div className={clsx('fixed z-20 origin-top-left', 'focus:outline-none')}>
                    <div className=''>
                        <DayPickerPeriod
                            value={_value}
                            onChange={(v) => {
                                set_value(v);
                                onChange(v);
                            }}
                            onCancel={() => {
                                setIsOpen(false);
                                onCancel();
                            }}
                            onConfirm={(range) => {
                                if (singleDate && range) {
                                    set_value(range);
                                    onChange(range);
                                }
                                setIsOpen(false);
                                onConfirm(range);
                            }}
                            isFillingAnimate={isFillingAnimate}
                            singleDate={singleDate}
                            isHideButtons={isHideButtons}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InputPeriod;
