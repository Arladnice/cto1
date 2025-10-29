import { useEffect, useRef, useState } from 'react';

export function useDynamicTableHeight(minHeight: number = 240, reservedPx: number = 20) {
    const containerRef = useRef<HTMLElement | null>(null);
    const [height, setHeight] = useState<number>(minHeight);

    useEffect(() => {
        const recalc = () => {
            const rectTop = containerRef.current?.getBoundingClientRect().top ?? 0;
            const next = Math.max(minHeight, Math.floor(window.innerHeight - rectTop - reservedPx));
            setHeight(next);
        };
        recalc();
        window.addEventListener('resize', recalc);
        return () => window.removeEventListener('resize', recalc);
    }, [minHeight, reservedPx]);

    return { containerRef, height } as const;
}
