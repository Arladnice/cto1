import React from 'react';
import { ChartSection } from '../../../components/Charts/ChartSection.tsx';

interface DowntimeHistogramProps {
    downtimeSeries?: {
        underTwo: number;
        underEight: number;
        underTwentyFour: number;
        underSeven: number;
        moreThenSeven: number;
        date: string;
    }[];
    loading?: boolean;
}

export const DowntimeHistogram: React.FC<DowntimeHistogramProps> = ({ downtimeSeries, loading = false }) => {
    return (
        <div className='w-[60%]'>
            <div className='w-full text-center text-[14px] leading-[120%] text-[#002033BF] uppercase'>
                Динамика Времени неработоспособности, шт
            </div>
            <div className='mt-[15px] px-[20px]'>
                <ChartSection downtimeSeries={downtimeSeries} loading={loading} />
            </div>
        </div>
    );
};
