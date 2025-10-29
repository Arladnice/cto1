import React from 'react';
import { DonutChart } from './Donat.tsx';
import { formatNumberCompact } from '@/lib/strings.ts';
import { ParameterItem } from './ParameterItem.tsx';

interface ParametersSectionProps {
    checkableCount: number;
    disabledCount: number;
    totalSignals: number;
    checkablePercent: number;
    disabledPercent: number;
    loading?: boolean;
}

export const ParametersSection: React.FC<ParametersSectionProps> = ({
    checkableCount,
    disabledCount,
    totalSignals,
    checkablePercent,
    disabledPercent,
    loading = false,
}) => {
    return (
        <div className='flex flex-1 flex-row items-center gap-[19px] pl-[14px] py-[12px] pr-[10px]'>
            <div className='flex flex-col items-center justify-center'>
                <DonutChart
                    data={[checkableCount, disabledCount]}
                    backgroundColor={['#006FBA', '#E6E9EBBF']}
                    centerText={formatNumberCompact(totalSignals)}
                    centerSubText='шт'
                    loading={loading}
                />
            </div>
            <div className='flex-1'>
                <div className='mb-[4px] ml-[10px] text-[11px] leading-[120%] font-[400] text-[#73858F]'>ПАРАМЕТРЫ</div>
                <div className='flex flex-col gap-[6px] text-[14px]'>
                    <ParameterItem
                        color='#006FBA'
                        label='Проверяемые системой'
                        percent={loading ? 0 : checkablePercent}
                        count={loading ? 0 : checkableCount}
                        loading={loading}
                        hasBorder={true}
                    />
                    <ParameterItem
                        color='#E6E9EBBF'
                        label='Отключенные для проверки'
                        percent={loading ? 0 : disabledPercent}
                        count={loading ? 0 : disabledCount}
                        loading={loading}
                        hasMargin={true}
                    />
                </div>
            </div>
        </div>
    );
};
