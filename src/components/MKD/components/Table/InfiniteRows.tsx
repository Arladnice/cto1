import React, {useState, useEffect, useRef, useCallback, ReactNode} from "react";

// Тип для функции отрисовки отдельной строки
type RenderRow<T> = (item: T | undefined, index: number) => ReactNode;

// Пропсы компонента
interface Props<T> {
    // Массив данных для отображения
    arrRow: (T | undefined)[];
    // Функция для отрисовки каждой строки
    renderRow: RenderRow<T>;
    // Беуферизация сверху (в количестве строк)
    bufferAbove?: number;
    // Беуферизация снизу (в количестве строк)
    bufferBelow?: number;
    // Порог (в количестве строк) до конца списка, при котором вызывается подгрузка
    loadThreshold?: number;
    // Коллбэк для подгрузки дополнительных данных при прокрутке вверх
    clbLoadMoreAbove?: (index?: number) => void | false | Promise<void | false>;
    // Коллбэк для подгрузки дополнительных данных при прокрутке вверх
    clbLoadMore?: () => void | false | Promise<void | false>;
    // Ссылка на родительский элемент, если скрол не на window
    parentRef?: React.RefObject<HTMLElement>;
    // Коллбэк, вызываемый при изменении индекса первой видимой строки
    onIndexChange?: (index: number) => void;
    // Коллбэк, вызываемый при достижении конца данных (если clbLoadMore вернул false)
    onEndData?: () => void;
    onEndDataAbove?: () => void; // <-- новое
}

// Высота по умолчанию для каждой строки
const DEFAULT_ROW_HEIGHT = 30;
let _scrollTop = 0;

/**
 * Компонент для отрисовки бесконечного списка строк с виртуализацией.
 * Отображает только те строки, которые находятся в видимой области (viewport).
 * Поддерживает подгрузку данных при приближении к концу списка.
 */
export default function InfiniteRows<T>({
                                            arrRow,
                                            renderRow,
                                            bufferAbove = 5,
                                            bufferBelow = 10,
                                            loadThreshold = 10,
                                            clbLoadMore,
                                            clbLoadMoreAbove,
                                            parentRef,
                                            onIndexChange,
                                            onEndData,
                                            onEndDataAbove
                                        }: Props<T>) {
    // Состояние текущего смещения скрола
    const [scrollTop, setScrollTop] = useState(0);

    // Состояние высоты видимой области (viewport height)
    const [vh, setVh] = useState(window.innerHeight);

    // Реф для отслеживания состояния загрузки
    const loading = useRef(false);
    const loadingAbove = useRef(false);

    // Определяем элемент, на котором отслеживается скрол
    const scrollContainer = parentRef?.current || window;

    // Обновление состояния скрола и высоты viewport
    const updateScroll = useCallback(() => {
        if (scrollContainer instanceof Window) {
            setScrollTop(window.scrollY);
            setVh(window.innerHeight);
        } else {
            setScrollTop(scrollContainer.scrollTop);
            setVh(scrollContainer.clientHeight);
        }
    }, [scrollContainer]);

    // Эффект для инициализации обработчиков скрола и ресайза
    useEffect(() => {
        // Инициализация начальных значений
        updateScroll();

        // Обработчики событий
        const handleScroll = () => updateScroll();
        const handleResize = () => setVh(window.innerHeight);

        // Добавление обработчиков
        if (scrollContainer instanceof Window) {
            window.addEventListener("scroll", handleScroll, {passive: true});
        } else {
            scrollContainer.addEventListener("scroll", handleScroll, {passive: true});
        }
        window.addEventListener("resize", handleResize, {passive: true});

        // Очистка обработчиков при размонтировании
        return () => {
            if (scrollContainer instanceof Window) {
                window.removeEventListener("scroll", handleScroll);
            } else {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, [updateScroll]); // updateScroll включает scrollContainer, поэтому его не нужно добавлять

    // Вычисляем смещения для каждой строки (предполагается фиксированная высота)
    const offsets = arrRow.map((_, i) => i * DEFAULT_ROW_HEIGHT); // Пусть пока тут полежит

    // Вычисляем индексы видимых строк с учетом отступа для плавности
    const startIndex = Math.max(0, Math.floor(scrollTop / DEFAULT_ROW_HEIGHT) - bufferAbove);
    const endIndex = Math.min(
        arrRow.length,
        startIndex + Math.ceil(vh / DEFAULT_ROW_HEIGHT) + bufferBelow
    );

    // console.log(startIndex, Math.floor(scrollTop / DEFAULT_ROW_HEIGHT), loadThreshold)

    // Вызываем коллбэк при изменении индекса первой видимой строки
    useEffect(() => {
        onIndexChange?.(startIndex);
    }, [startIndex, onIndexChange]);


    const isScrollUp = _scrollTop > scrollTop;
    _scrollTop = scrollTop;
    // console.log(isScrollUp);
    // Эффект для подгрузки данных при приближении к началу списка
    if (isScrollUp) {
        if (!clbLoadMoreAbove || loadingAbove.current) return;

        loadingAbove.current = true;
        const resultPromise = clbLoadMoreAbove(endIndex + loadThreshold);

        Promise.resolve(resultPromise)
            .then((result) => {
                if (result === false) {
                    onEndDataAbove?.();
                }
            })
            .finally(() => {
                loadingAbove.current = false;
            });

    }

    // Эффект для подгрузки данных при приближении к концу списка
    useEffect(() => {
        if (!clbLoadMore || loading.current) return;

        // Если осталось меньше loadThreshold строк до конца массива
        if (arrRow.length - endIndex < loadThreshold) {
            loading.current = true;
            const resultPromise = clbLoadMore();

            Promise.resolve(resultPromise)
                .then((result) => {
                    // Если коллбэк вернул false, значит данных больше нет
                    if (result === false) {
                        onEndData?.();
                    }
                })
                .finally(() => {
                    // Сбрасываем флаг загрузки
                    loading.current = false;
                });
        }
    }, [endIndex, arrRow.length, clbLoadMore, loadThreshold, onEndData]);

    // Рендерим только видимые строки
    const renderedRows = [];
    for (let i = startIndex; i < endIndex; i++) {
        const rowElement = renderRow(arrRow[i], i);
        // Проверяем, что элемент существует, перед тем как его рендерить
        if (rowElement != null) {
            renderedRows.push(
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        top: i * DEFAULT_ROW_HEIGHT,
                        left: 0,
                        right: 0,
                        height: DEFAULT_ROW_HEIGHT, // Рекомендуется для предсказуемости
                    }}
                >
                    {rowElement}
                </div>
            );
        }
    }

    // Общий контейнер, задающий высоту всего списка
    return (
        <div style={{height: arrRow.length * DEFAULT_ROW_HEIGHT, position: "relative"}}>
            {renderedRows}
        </div>
    );
}