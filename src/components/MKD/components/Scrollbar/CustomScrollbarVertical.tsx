import clsx from "clsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {setStyle} from "@/lib/dom.ts";

// language=css
setStyle(`
    .custom_scrollbar_vertical--hidden::-webkit-scrollbar {
        overflow-y: auto;
        display: none; /* для Chrome, Safari, Edge */
    }

    .custom_scrollbar_vertical--hidden {
        -ms-overflow-style: none; /* для IE и Edge */
        scrollbar-width: none; /* для Firefox */
    }

`, 'custom_scrollbar_vertical')

const CustomScrollbarVertical = ({
                                     targetRef,
                                     className = '',
                                     classNameThumb = '',
                                     kDelta = 1,
                                     smooth = false,
                                     refreshTime = 2000,
                                     buttonMiddleScroll = false,
                                     onRelease = null
                                 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const initialYRef = useRef(0);

    const [isShow, setIsShow] = useState(true)
    const [position, setPosition] = useState({y: 0});
    const [isDragging, setIsDragging] = useState(false);
    const [thumbHeight, setThumbHeight] = useState(20);

    // Обработчик скролла
    const handleScroll = useCallback((e: Event) => {

        e.preventDefault();

        const {deltaY, shiftKey} = (e as WheelEvent);

        if (shiftKey) return;

        const maxPos = targetRef.current.scrollTop + deltaY * kDelta;

        targetRef.current.scrollTo({
            left: targetRef.current.scrollLeft,
            top: maxPos,
            behavior: smooth ? "smooth" : "instant"
        });

        const scrollRatio = targetRef.current.scrollTop / (targetRef.current.scrollHeight - targetRef.current.clientHeight);
        const offY = (containerRef.current.offsetHeight - thumbHeight) * scrollRatio;

        calcMove(targetRef.current.scrollLeft, offY);

        onRelease && onRelease();
    }, [thumbHeight]);

    // Инициализация
    useEffect(() => {
        const tar = targetRef.current;
        if (!tar || !containerRef.current) return;

        if (buttonMiddleScroll)
            tar.classList.add('custom_scrollbar_vertical--hidden');
        else
            tar.style.overflowY = 'hidden';

        const resizeThumb = () => {
            const k = tar.clientHeight / tar.scrollHeight;
            setIsShow(k != 1);
            const newThumbHeight = (containerRef?.current?.offsetHeight ?? 0) * k;
            setThumbHeight(newThumbHeight);

            setTimeout(resizeThumb, refreshTime);
        }
        resizeThumb();

        tar.addEventListener('wheel', handleScroll);

        const ro = new ResizeObserver(entries => {
            resizeThumb();
        });
        ro.observe(tar);

        return () => tar?.removeEventListener('wheel', handleScroll);
    }, [targetRef, handleScroll]);

    // Обработчики drag-событий
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        setIsDragging(true);

        document.body.onselectstart = () => false;
        initialYRef.current = e.clientY - position.y;

        onRelease && onRelease();
    }, [position.y]);

    function calcMove(offX: number, offY: number) {
        const containerHeight = containerRef.current.offsetHeight;
        const maxPos = containerHeight - thumbHeight;
        let newY = Math.max(0, Math.min(offY, maxPos));
        // if (newY < 15) newY = 15;
        setPosition({y: newY});

        const scrollRatio = newY / maxPos;
        const scrollPos = scrollRatio *
            (targetRef.current.scrollHeight - targetRef.current.clientHeight);
        targetRef.current.scrollTo(offX, scrollPos);
    }

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !containerRef.current || !targetRef.current) return;

        calcMove(targetRef.current.scrollLeft, e.clientY - initialYRef.current);
    }, [isDragging, thumbHeight]);

    const handleMouseUp = useCallback((e) => {
        setIsDragging(false);
        document.body.onselectstart = null;
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
                'h-full w-full',
                "bg-s-gray-200 relative overflow-hidden",
                className
            )}
            onClick={e => e.stopPropagation()}
        >
            <div
                ref={boxRef}
                className={clsx("h-full w-full bg-gray-500 ",
                    // "py-[7.5px]",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                    " absolute left-1/2 -translate-x-1/2", classNameThumb)}
                style={{top: `${position.y}px`, height: `${thumbHeight}px`}}
                // style={{top: `${position.y - 15}px`, height: `${thumbHeight}px`}}
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

export default CustomScrollbarVertical;