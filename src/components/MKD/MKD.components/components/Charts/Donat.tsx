import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

interface DonutChartProps {
    data: number[];
    backgroundColor: string[];
    centerText: string;
    centerSubText: string;
    loading?: boolean;
    height?: number;
    width?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
    data,
    backgroundColor,
    centerText,
    centerSubText,
    loading = false,
    height = 92,
    width = 92,
}) => {
    if (loading) {
        return (
            <div className='relative' style={{ height, width }}>
                <div
                    className='absolute inset-0 m-auto animate-spin rounded-full border-4 border-[#E6E9EB] border-t-[#006FBA]'
                    style={{ height, width }}
                />
                <div className='absolute top-1/2 left-1/2 text-center' style={{ transform: 'translate(-50%, -35%)' }}>
                    <div className='mb-[2px] text-[14px] leading-none font-[500] text-[#00203380]'>…</div>
                    <div className='text-[9px] leading-none font-[400] text-[#00203380]'>{centerSubText}</div>
                </div>
            </div>
        );
    }

    return (
        <div className='relative' style={{ height, width }}>
            <Doughnut
                data={{
                    datasets: [
                        {
                            data,
                            backgroundColor,
                            borderWidth: 0,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '90%',
                    plugins: {
                        datalabels: {
                            display: false,
                        },
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            enabled: false,
                        },
                    },
                }}
            />
            <div className='absolute top-1/2 left-1/2 text-center' style={{ transform: 'translate(-50%, -35%)' }}>
                <div className='mb-[2px] text-[14px] leading-none font-[500] text-[#002033BF]'>{centerText}</div>
                <div className='text-[9px] leading-none font-[400] text-[#002033BF]'>{centerSubText}</div>
            </div>
        </div>
    );
};
