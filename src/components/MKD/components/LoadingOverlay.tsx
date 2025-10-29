import React from 'react';
import clsx from 'clsx';

interface LoadingOverlayProps {
    show: boolean;
    text?: string;
    className?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ show, text = 'Загрузка данных...', className }) => {
    if (!show) return null;
    return (
        <div className={clsx('absolute inset-0 z-10 flex items-center justify-center bg-white/80', className)}>
            <div className='flex flex-col items-center gap-2'>
                <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-[#006FBA]'></div>
                <div className='text-sm text-[#002033BF]'>{text}</div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
