import React from 'react';
import { formatNumberCompact } from '@/lib/strings.ts';

interface ParameterItemProps {
    color: string;
    label: string;
    percent: number;
    count: number;
    hasBorder?: boolean;
    hasMargin?: boolean;
    loading?: boolean;
}

export const ParameterItem: React.FC<ParameterItemProps> = ({
    color,
    label,
    percent,
    count,
    hasBorder = false,
    hasMargin = false,
    loading = false,
}) => {
    const baseClasses = 'flex flex-row items-center gap-[10px]';
    const borderClasses = hasBorder ? 'border border-dashed border-[#006FBA4D] rounded-[6px] py-[7px] px-[10px]' : '';
    const marginClasses = hasMargin ? 'ml-[10px] mr-[10px]' : '';
    const displayPercent = Math.round(percent);

    return (
        <div className={`${baseClasses} ${borderClasses} ${marginClasses}`}>
            <div className='h-[8px] w-[8px] rounded-full' style={{ backgroundColor: color }} />
            <div className='grow text-[11px] leading-[120%] text-[#73858F]'>{label}</div>
            {loading ? (
                <div className='flex items-center gap-[6px]'>
                    <div className='h-[12px] w-[22px] animate-pulse rounded bg-[#E6E9EB]' />
                    <div className='h-[10px] w-[10px] animate-pulse rounded bg-[#E6E9EB]' />
                    <div className='h-[12px] w-[56px] animate-pulse rounded bg-[#E6E9EB]' />
                </div>
            ) : (
                <div className='flex flex-none items-center gap-[2px] whitespace-nowrap'>
                    <span className='text-[14px] leading-[120%] text-[#1A3747]'>{displayPercent}</span>
                    <span className='text-[10px] leading-[120%] text-[#1A3747]'>%</span>
                    <span className='text-[12px] leading-[120%] text-[#00203380]'>
                        / {formatNumberCompact(count)} шт
                    </span>
                </div>
            )}
        </div>
    );
};
