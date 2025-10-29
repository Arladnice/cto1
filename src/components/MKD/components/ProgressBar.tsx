import React, {useEffect, useState} from 'react';
import clsx from "clsx";

interface ProgressBarProps {
    value?: number | string;
    max?: number | string;
    className?: string;
    classNameThumb?: string;
}

const ProgressBar = ({value = 75, max = 100, className, classNameThumb}: ProgressBarProps) => {
    const percentage = Math.min(Math.max((+value / +max) * 100, 0), 100);

    // Состояние для отслеживания первого рендера
    const [isMounted, setIsMounted] = useState(false);

    // Устанавливаем isMounted в true после первого рендера
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // @ts-ignore
    return <div
        className={className}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
    >
        <div
            className={clsx(
                'h-[inherit]',
                isMounted && 'transition-all duration-500 ease-out', // Анимация только после монтирования
                classNameThumb
            )}
            style={{width: isMounted ? `${percentage}%` : '0%'}} // Начинаем с 0% при первом рендере
        />
    </div>
};

export default ProgressBar;