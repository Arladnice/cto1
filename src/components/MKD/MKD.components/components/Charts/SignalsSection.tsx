import React from 'react';
import { DonutChart } from './Donat.tsx';
import { ParameterItem } from './ParameterItem.tsx';
import { formatNumberCompact } from '@/lib/strings.ts';

interface SignalsSectionProps {
    goodSignalsCount: number;
    badSignalsCount: number;
    totalParams: number;
    goodSignalsPercent: number;
    badSignalsPercent: number;
    loading?: boolean;
}

export const SignalsSection: React.FC<SignalsSectionProps> = ({
    goodSignalsCount,
    badSignalsCount,
    totalParams,
    goodSignalsPercent,
    badSignalsPercent,
    loading = false,
}) => {
    return (
        <div className='relative flex flex-1 flex-row items-center gap-[19px] pl-[14px] py-[12px] pr-[10px] before:pointer-events-none before:absolute before:inset-0 before:rounded-[6px] before:border before:border-dashed before:border-[#006FBA4D]'>
            <div className='flex flex-col items-center justify-center'>
                <DonutChart
                    data={[goodSignalsCount, badSignalsCount]}
                    backgroundColor={['#A4DFA0', '#FE7070']}
                    centerText={formatNumberCompact(totalParams)}
                    centerSubText='шт'
                    loading={loading}
                />
            </div>
            <div className='flex-1'>
                <div className='mb-[8px] text-[11px] leading-[120%] font-[400] text-[#73858F]'>СИГНАЛЫ</div>
                <div className='flex flex-col gap-[12px] text-[14px]'>
                    <ParameterItem
                        color='#A4DFA0'
                        label='Качественных сигналов'
                        percent={loading ? 0 : goodSignalsPercent}
                        count={loading ? 0 : goodSignalsCount}
                        loading={loading}
                    />
                    <ParameterItem
                        color='#FE7070'
                        label='Некачественных сигналов'
                        percent={loading ? 0 : badSignalsPercent}
                        count={loading ? 0 : badSignalsCount}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};
