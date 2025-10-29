import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

type TooltipDirection = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
    target: ReactNode;
    dir?: TooltipDirection;
    timeShow?: number;
    timeHide?: number;
    children: ReactNode;
    onHover?: () => void;
}

const Tooltip = ({ target, dir = 'bottom', timeShow = 300, timeHide = 150, onHover, children }: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [finalPosition, setFinalPosition] = useState<CSSProperties>({});
    const tooltipRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const showTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Очистка таймеров при размонтировании
    useEffect(() => {
        return () => {
            showTimeout.current && clearTimeout(showTimeout.current as any);
            hideTimeout.current && clearTimeout(hideTimeout.current as any);
        };
    }, []);

    // Расчет и установка позиции при изменении видимости
    useEffect(() => {
        if (!isVisible || !tooltipRef.current || !triggerRef.current) return;

        const calculatePosition = () => {
            const triggerRect = triggerRef.current!.getBoundingClientRect();
            const tooltipRect = tooltipRef.current!.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Проверка доступности направлений
            const availableDirections = {
                top: triggerRect.top - tooltipRect.height >= 0,
                bottom: triggerRect.bottom + tooltipRect.height <= viewportHeight,
                left: triggerRect.left - tooltipRect.width >= 0,
                right: triggerRect.right + tooltipRect.width <= viewportWidth,
            };

            // Выбор направления с приоритетом: запрошенное -> противоположное -> другие
            let direction = dir;
            if (!availableDirections[dir]) {
                const fallback: Record<TooltipDirection, TooltipDirection[]> = {
                    top: ['bottom', 'right', 'left'],
                    bottom: ['top', 'right', 'left'],
                    left: ['right', 'bottom', 'top'],
                    right: ['left', 'bottom', 'top'],
                };

                direction = fallback[dir].find((d) => availableDirections[d]) || dir;
            }

            // Расчет базовой позиции
            let top = 0;
            let left = 0;
            const offset = 2;

            switch (direction) {
                case 'top':
                    top = triggerRect.top - tooltipRect.height - offset;
                    left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + offset;
                    left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
                    break;
                case 'left':
                    top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
                    left = triggerRect.left - tooltipRect.width - offset;
                    break;
                case 'right':
                    top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
                    left = triggerRect.right + offset;
                    break;
            }

            // Коррекция по границам экрана
            left = Math.max(offset, Math.min(left, viewportWidth - tooltipRect.width - offset));
            top = Math.max(offset, Math.min(top, viewportHeight - tooltipRect.height - offset));

            // Учет выравнивания относительно триггера
            if (direction === 'top' || direction === 'bottom') {
                if (left < offset) left = offset;
                if (left + tooltipRect.width > viewportWidth - offset) {
                    left = viewportWidth - tooltipRect.width - offset;
                }
            } else {
                if (top < offset) top = offset;
                if (top + tooltipRect.height > viewportHeight - offset) {
                    top = viewportHeight - tooltipRect.height - offset;
                }
            }

            setFinalPosition({
                position: 'fixed',
                top: `${top}px`,
                left: `${left}px`,
                zIndex: 1000,
            });
        };

        // Задержка для гарантии применения размеров tooltip
        requestAnimationFrame(() => {
            calculatePosition();
        });

        // Обработчик изменений размеров окна
        const handleResize = () => calculatePosition();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isVisible, dir]);

    const handleMouseEnter = () => {
        hideTimeout.current && clearTimeout(hideTimeout.current as any);
        hideTimeout.current = null;

        showTimeout.current = setTimeout(() => {
            setIsVisible(true);
        }, timeShow);

        onHover && onHover();
    };

    const handleMouseLeave = () => {
        showTimeout.current && clearTimeout(showTimeout.current as any);
        showTimeout.current = null;

        hideTimeout.current = setTimeout(() => {
            setIsVisible(false);
        }, timeHide);
    };

    return (
        <div className='relative contents'>
            <div
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className='inline-block'
            >
                {children}
            </div>

            {isVisible && (
                <div
                    ref={tooltipRef}
                    style={finalPosition}
                    className='animate-fadeIn fixed transition-opacity duration-150'
                    onMouseEnter={() => hideTimeout.current && clearTimeout(hideTimeout.current as any)}
                    onMouseLeave={handleMouseLeave}
                >
                    {target}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
