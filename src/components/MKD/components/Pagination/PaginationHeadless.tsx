import {
    useState,
    useEffect,
    useCallback
} from 'react';

// типы для пропсов
export type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    initialPage?: number;
    onPageChange?: (page: number) => void;
    siblingCount?: number;
    boundaryCount?: number;
    toPage?: number;
};

export type PaginationRange = (number | '...')[];

export const usePagination = ({
                                  totalItems,
                                  itemsPerPage,
                                  initialPage = 1,
                                  onPageChange,
                                  siblingCount = 1,
                                  boundaryCount = 1,
                                  toPage = 0
                              }: PaginationProps) => {
    // вычисляем общее количество страниц
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // состояние текущей страницы
    const [currentPage, setCurrentPage] =
        useState(() => Math.min(initialPage, totalPages));

    // обработчик изменения страницы
    const goToPage = useCallback((page: number) => {
        const newPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(newPage);
        onPageChange?.(newPage);
    }, [totalPages, onPageChange]);

    useEffect(() => {
        goToPage(Math.trunc(toPage))
    }, [toPage]);

    // переходы
    const nextPage = () => goToPage(currentPage + 1);
    const prevPage = () => goToPage(currentPage - 1);
    const firstPage = () => goToPage(1);
    const lastPage = () => goToPage(totalPages);

    // генерация диапазона страниц
    const getPageRange = useCallback((): PaginationRange => {
        // общее количество элементов в пагинации:
        // first + last + current + siblings*2 + ellipsis*2
        const totalNumbers =
            (siblingCount * 2 + 3) +
            (boundaryCount * 2);

        // Если страниц меньше чем элементов пагинации
        if (totalPages <= totalNumbers) {
            return Array.from({length: totalPages}, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(
            currentPage - siblingCount,
            1
        );
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPages
        );

        const shouldShowLeftEllipsis =
            leftSiblingIndex > boundaryCount + 2;
        const shouldShowRightEllipsis =
            rightSiblingIndex < totalPages - (boundaryCount + 1);

        // варианты отображения пагинации
        if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
            const leftRange = Array.from(
                {length: boundaryCount * 2 + siblingCount * 2 + 1},
                (_, i) => i + 1
            );
            return [...leftRange, '...', totalPages];
        }

        if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
            const rightRange = Array.from(
                {length: boundaryCount * 2 + siblingCount * 2 + 1},
                (_, i) => totalPages - i
            ).reverse();
            return [1, '...', ...rightRange];
        }

        // центральный вариант с двумя многоточиями
        const middleRange = Array.from(
            {length: rightSiblingIndex - leftSiblingIndex + 1},
            (_, i) => leftSiblingIndex + i
        );
        return [
            ...Array.from({length: boundaryCount}, (_, i) => i + 1),
            '...',
            ...middleRange,
            '...',
            ...Array.from(
                {length: boundaryCount},
                (_, i) => totalPages - boundaryCount + i + 1
            )
        ];
    }, [currentPage, totalPages, siblingCount, boundaryCount]);

    // синхронизация при изменении параметров
    useEffect(() => {
        if (currentPage > totalPages) {
            goToPage(totalPages);
        }
    }, [totalItems, itemsPerPage, currentPage, totalPages, goToPage]);

    return {
        currentPage,
        totalPages,
        setPage: goToPage,
        nextPage,
        prevPage,
        firstPage,
        lastPage,
        pageRange: getPageRange(),
        isFirstPage: currentPage === 1,
        isLastPage: currentPage === totalPages,
        totalItems,
        itemsPerPage,
        rangeStart: (currentPage - 1) * itemsPerPage + 1,
        rangeEnd: Math.min(currentPage * itemsPerPage, totalItems)
    };
};

// тип компонета пагинации
export type PaginationComponentProps = {
    pagination: ReturnType<typeof usePagination>;
    render: (pagination: ReturnType<typeof usePagination>) => React.ReactNode;
};

// Headless-компонент
export const PaginationHeadless = ({pagination, render}: PaginationComponentProps) => {
    return <>{render(pagination)}</>;
};