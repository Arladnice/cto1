import clsx from 'clsx';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {setStyle} from "@/lib/dom.ts";

/*noinspection ALL*/
// language=css
setStyle(
    `/*noinspection CSSInvalidTypeSelector */
    /*noinspection CssUnusedSymbol*/
    .custom_scrollbar_horizontal--hidden::-webkit-scrollbar {
        overflow-x: auto;
        display: none; /* для Chrome, Safari, Edge */
    }

    /*noinspection CSSInvalidTypeSelector */
    /*noinspection CssUnusedSymbol*/
    .custom_scrollbar_horizontal--hidden {
        -ms-overflow-style: none; /* для IE и Edge */
        scrollbar-width: none; /* для Firefox */
    }`,
    // format=false
    'custom_scrollbar_horizontal');

let lastX = 0, deltaX = 0, clickX = 0, clickY = 0, isDrag = false, button = -1;

const CustomScrollbarHorizontal = ({
                                       targetRef,
                                       className = '',
                                       classNameThumb = '',
                                       kDelta = 1,
                                       smooth = false,
                                       refreshTime = 2000,
                                       buttonMiddleScroll = false,
                                       onRelease = null // завершение дествия со скролом
                                   }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const initialXRef = useRef(0);

    const [isShow, setIsShow] = useState(true)
    const [position, setPosition] = useState({x: 0});
    const [isDragging, setIsDragging] = useState(false);
    const [thumbWidth, setThumbWidth] = useState(20);

    // Обработчик скролла
    const handleScroll = useCallback((e: Event) => {

        const {deltaY, shiftKey} = (e as WheelEvent);

        if (!shiftKey) return;

        e.preventDefault();

        const maxPos = targetRef.current.scrollLeft + deltaY * kDelta;

        // targetRef.current.scrollTo(maxPos, 0);
        targetRef.current.scrollTo({
            left: maxPos,
            top: targetRef.current.scrollTop,
            behavior: smooth ? "smooth" : "instant"
        });

        const scrollRatio = targetRef.current.scrollLeft / (targetRef.current.scrollWidth - targetRef.current.clientWidth);
        const offX = (containerRef.current.offsetWidth - thumbWidth) * scrollRatio;

        calcMove(offX, targetRef.current.scrollTop);

        onRelease && onRelease();
    }, [thumbWidth]);

    // Инициализация
    useEffect(() => {
        const tar = targetRef.current;
        if (!tar || !containerRef.current) return;

        if (buttonMiddleScroll)
            tar.classList.add('custom_scrollbar_horizontal--hidden');
        else
            tar.style.overflowX = 'hidden';

        const resizeThumb = () => {
            const k = tar.clientWidth / tar.scrollWidth;
            setIsShow(k != 1);
            const newThumbWidth = (containerRef?.current?.offsetWidth ?? 0) * k;
            setThumbWidth(newThumbWidth);

            setTimeout(resizeThumb, refreshTime);
        }
        resizeThumb();

        tar.addEventListener('wheel', handleScroll);

        tar.addEventListener('mousedown', function (event: { clientX: number; clientY: number; button: number; }) {
            // @ts-ignore
            clickX = event.clientX;
            clickY = event.clientY;

            button = event.button;

            if (button == 1) tar.style.cursor = 'grab';
        }, false);

        tar.addEventListener('mouseup', function () {
            isDrag = false;
            button = -1;
            clickX = clickY = 0;
            tar.style.cursor = 'default';
        }, false);

        tar.addEventListener('mousemove', (event: { clientX: number; clientY: number; }) => {

            deltaX = event.clientX - lastX;

            lastX = event.clientX;

            const dist = Math.sqrt(clickX ** 2 + clickY ** 2);
            if (dist > 2) {
                isDrag = true;
            }
            if (isDrag && button == 1) {
                tar.style.cursor = 'grabbing';
                tar.scrollLeft -= deltaX * 2;

                const containerWidth = containerRef.current.offsetWidth;
                const maxPos = containerWidth - thumbWidth;
                const kk = tar.scrollWidth / containerRef.current.clientWidth;
                const newX = Math.max(0, Math.min(tar.scrollLeft / kk, maxPos));

                setPosition({x: newX});
            }

        });

        const ro = new ResizeObserver(() => {
            resizeThumb();
            /*for (let entry of entries) {
                console.log('Новый размер элемента:', entry.contentRect.width, entry.contentRect.height);
            }*/
        });
        ro.observe(tar);

        // return () => tar?.removeEventListener('wheel', handleScroll);
    }, [targetRef, handleScroll]);

    // Обработчики drag-событий
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        setIsDragging(true);

        document.body.onselectstart = () => false; //TODO: временное решение: Отключаем text selection на всем body
        initialXRef.current = e.clientX - position.x;
    }, [position.x]);

    function calcMove(offX: number, offY: number) {
        const containerWidth = containerRef.current.offsetWidth;
        const maxPos = containerWidth - thumbWidth;
        const newX = Math.max(0, Math.min(offX, maxPos));

        setPosition({x: newX});

        const scrollRatio = newX / maxPos;
        const scrollPos = scrollRatio *
            (targetRef.current.scrollWidth - targetRef.current.clientWidth);
        targetRef.current.scrollTo(scrollPos, offY);
    }

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !containerRef.current || !targetRef.current) return;

        calcMove(e.clientX - initialXRef.current, targetRef.current.scrollTop);
    }, [isDragging, thumbWidth]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        document.body.onselectstart = null;  //TODO: временное решение: Возвращаем возможность text selection на всем body
        onRelease && onRelease();
    }, []);

    // Глобальные события
    useEffect(() => {
        if (!isDragging) return;
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    return (isShow && <div
            ref={containerRef}
            className={clsx(
                'w-full h-1',
                "bg-gray-200 relative overflow-hidden",
                className
            )}
            onClick={e => e.stopPropagation()}
        >
            <div
                ref={boxRef}
                className={clsx("h-full bg-gray-500 ",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                    " absolute top-1/2 -translate-y-1/2", classNameThumb)}
                style={{left: `${position.x}px`, width: `${thumbWidth}px`}}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

export default CustomScrollbarHorizontal;