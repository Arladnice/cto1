import React, { useState, useEffect, useRef } from 'react';
import { IconArrowDownBadge12, IconRightArrow } from '../../../components/Icons.tsx';
import { INDICATORS_MODE } from '@/components/MKD/stores/slices/centralChartsSlice.ts';

export type GeneralTileItem = {
    name: string;
    percent: number; // 0..100
    count: number; // absolute count
    color: string; // dot color
};

interface GeneralTilesProps {
    title: string;
    onModeChange: (mode: INDICATORS_MODE) => void;
    items: GeneralTileItem[];
    loading?: boolean;
    disabled?: boolean;
    currentMode?: INDICATORS_MODE;
}

export const GeneralTiles: React.FC<GeneralTilesProps> = ({
    title,
    onModeChange,
    items,
    loading = false,
    disabled = false,
    currentMode,
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);

    // 5 columns x 3 rows = 15 per page
    const pageSize = 15;
    const skeletonCount = 5;
    const totalItems = loading ? Math.max(items.length, skeletonCount) : items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    useEffect(() => {
        setPage(0);
    }, [items, loading]);

    return (
        <div className='w-full rounded-[10px] border border-[#E5E9EB] bg-white px-[20px] pt-[20px] shadow-[0px_2px_5px_0px_#00203333]'>
            <div className='mb-[12px] flex items-center justify-center gap-[10px]'>
                <div className='text-[14px] leading-[120%] text-[#002033BF] uppercase'>{title}</div>
                <div className='relative' ref={containerRef}>
                    <button
                        className={
                            (disabled ? 'opacity-60 ' : 'cursor-pointer ') +
                            'flex h-[20px] w-[20px] items-center justify-center'
                        }
                        onClick={() => {
                            if (disabled) return;
                            setOpen((v) => !v);
                        }}
                        aria-label='toggle menu'
                        aria-disabled={disabled}
                    >
                        <IconArrowDownBadge12 className={disabled ? '' : 'cursor-pointer'} />
                    </button>
                    {open && !disabled && (
                        <div className='absolute right-0 z-10 mt-[6px] min-w-[280px] rounded-[6px] border border-[#F2F4F4] bg-white shadow-[0px_2px_5px_0px_#00203326]'>
                            <button
                                className={
                                    'block w-full cursor-pointer px-[12px] py-[8px] text-left text-[12px] leading-[120%] hover:bg-[#F5F7F9] ' +
                                    (currentMode === INDICATORS_MODE.Parameters
                                        ? 'bg-[#F5F7F9] text-[#1A3747]'
                                        : 'text-[#73858F]')
                                }
                                onClick={() => {
                                    onModeChange(INDICATORS_MODE.Parameters);
                                    setOpen(false);
                                }}
                            >
                                Общие показатели по параметрам
                            </button>
                            <button
                                className={
                                    'block w-full cursor-pointer px-[12px] py-[8px] text-left text-[12px] leading-[120%] hover:bg-[#F5F7F9] ' +
                                    (currentMode === INDICATORS_MODE.Rules
                                        ? 'bg-[#F5F7F9] text-[#1A3747]'
                                        : 'text-[#73858F]')
                                }
                                onClick={() => {
                                    onModeChange(INDICATORS_MODE.Rules);
                                    setOpen(false);
                                }}
                            >
                                Общие показатели по правилам
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className='relative min-h-[285px]'>
                {totalPages > 1 && (
                    <button
                        className='absolute top-1/2 left-[-15px] z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center rounded-full'
                        onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
                        aria-label='prev page'
                    >
                        <div className='rotate-180'>
                            <IconRightArrow />
                        </div>
                    </button>
                )}
                <div className='grid grid-cols-5 gap-[10px]'>
                    {(loading ? Array.from({ length: skeletonCount }) : Array.from({ length: pageSize })).map(
                        (_, idx) => {
                            const globalIndex = page * pageSize + idx;
                            const item = items[globalIndex];
                            return (
                                <div
                                    key={`${loading ? 'skeleton' : item?.name}-${globalIndex}`}
                                    className={
                                        (loading || item ? '' : 'invisible ') +
                                        'flex h-[88.33px] flex-col justify-between rounded-[8px] border border-[#E6E9EB] p-[10px]'
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
                                        <div>
                                            <div className='text-[14px] leading-[100%] text-[#1A3747]'>
                                                {item?.percent} <span className='text-[10px]'>%</span>
                                            </div>
                                            <div className='mt-[2px] text-[12px] leading-[120%] text-[#73858F]'>
                                                <span className='text-[10px]'>
                                                    {Number(item?.count || 0).toLocaleString('ru-RU')} шт
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        }
                    )}
                </div>
                {totalPages > 1 && (
                    <button
                        className='absolute top-1/2 right-[-23px] z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full'
                        onClick={() => setPage((p) => (p + 1) % totalPages)}
                        aria-label='next page'
                    >
                        <IconRightArrow />
                    </button>
                )}
            </div>
            <div className='mt-[6px] mb-[10px] flex h-[10px] items-center justify-center gap-[6px]'>
                {totalPages > 1 &&
                    Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={`dot-${i}`}
                            className='h-[4px] w-[4px] rounded-full'
                            style={{ backgroundColor: i === page ? '#B3BDC2' : '#E6E9EB' }}
                            onClick={() => setPage(i)}
                            aria-label={`go to page ${i + 1}`}
                        />
                    ))}
            </div>
        </div>
    );
};

export default GeneralTiles;
