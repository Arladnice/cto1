import { formatNumberCompact } from '@/lib/strings';
import { DonutChart } from '../../../components/Charts/Donat';

interface DowntimeProps {
    loading?: boolean;
    items: { name: string; color: string; percent: number; count: number }[];
    donut: { data: number[]; colors: string[]; total: number };
}

export const Downtime: React.FC<DowntimeProps> = ({ loading, items, donut }) => {
    const page = 0;
    const pageSize = 5;
    const skeletonCount = 5;
    return (
        <div className='w-[40%]'>
            <div className='w-full text-center text-[14px] leading-[120%] text-[#002033BF] uppercase'>
                Время неработоспособности, отсутствие данных
            </div>
            <div className='flex gap-[65px] px-[65px] pt-[35px] pb-[26px]'>
                <DonutChart
                    data={donut.data}
                    backgroundColor={donut.colors}
                    centerText={formatNumberCompact(donut.total)}
                    centerSubText='шт'
                    loading={false}
                    height={136}
                    width={136}
                />
                <div className='grid flex-1 grid-cols-6 gap-[10px]'>
                    {(loading ? Array.from({ length: skeletonCount }) : Array.from({ length: pageSize })).map(
                        (_, idx) => {
                            const globalIndex = page * pageSize + idx;
                            const item = items[globalIndex];
                            return (
                                <div
                                    key={`${loading ? 'skeleton' : item?.name}-${globalIndex}`}
                                    className={
                                        (loading || item ? '' : 'invisible ') +
                                        `${idx < 3 ? 'col-span-2' : 'col-span-3'} flex h-[65px] w-full flex-col justify-between rounded-[8px] border border-[#E6E9EB] p-[10px]`
                                    }
                                >
                                    <div className='flex items-start justify-between gap-[8px]'>
                                        {loading ? (
                                            <div className='h-[11px] w-[70%] animate-pulse rounded bg-[#E6E9EB]' />
                                        ) : (
                                            <div className='max-h-[26px] overflow-hidden text-[11px] leading-[100%] text-[#73858F]'>
                                                {item?.name}
                                            </div>
                                        )}
                                        <span
                                            className={
                                                loading
                                                    ? 'inline-block h-[8px] w-[8px] flex-none animate-pulse rounded-full bg-[#E6E9EB]'
                                                    : 'inline-block h-[8px] w-[8px] flex-none rounded-full'
                                            }
                                            style={!loading ? { backgroundColor: item?.color } : undefined}
                                        />
                                    </div>
                                    {loading ? (
                                        <>
                                            <div className='mt-[10px] h-[14px] w-[28px] animate-pulse rounded bg-[#E6E9EB]' />
                                            <div className='mt-[8px] h-[12px] w-[72px] animate-pulse rounded bg-[#E6E9EB]' />
                                        </>
                                    ) : (
                                        <div className='flex flex-col'>
                                            <div className='flex flex-none items-center gap-[2px] whitespace-nowrap'>
                                                <span className='text-[14px] leading-[120%] text-[#1A3747]'>
                                                    {item?.percent}
                                                </span>
                                                <span className='text-[10px] leading-[120%] text-[#1A3747]'>%</span>
                                                <span className='text-[11px] leading-[120%] text-[#00203380]'>
                                                    / {formatNumberCompact(item?.count ?? 0)} шт
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
};
