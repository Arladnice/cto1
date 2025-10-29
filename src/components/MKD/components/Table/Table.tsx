import React, {useRef, useState} from "react";
import clsx from "clsx";
import InfiniteRows from "@/components/MKD/components/Table/InfiniteRows.tsx";

export interface CellProps {
    e?: React.MouseEvent<HTMLDivElement>;
    colIndex?: number;
    rowIndex?: number;
    key?: string;
    value?: string | number | boolean;
    arrRow?: any[];
    arrNodes?: HTMLElement[][]
}

export type ClbItemHandler = (props: CellProps) => any;

interface ListProps {
    arrTable: any[][],
    arrHeader: string[],
    className?: string;

    styleHeaderRow?: string | null;
    clbStyleHeader?: ClbItemHandler;
    clbHeader?: ClbItemHandler;
    onClickHeader?: ClbItemHandler;

    clbStyleRow?: ClbItemHandler;
    clbStyleCell?: ClbItemHandler;
    clbCell?: ClbItemHandler;
    onClickCell?: ClbItemHandler;

    arrWidthColumn?: string[] | number[];

    clbLoadMore?: () => any,
    clbLoadMoreAbove?: (index: number) => any,
    onIndexChange?: (columnIndex: number) => void;
    arrColExcludes?: number[] | null; // Массив индексов исключенных колонок

    clbFilter?: ClbItemHandler;
}

const Table = React.forwardRef<HTMLDivElement, ListProps>(
    ({
         arrHeader,
         arrTable,

         clbStyleHeader, // Стиль для заголовка
         clbHeader,// Для заголовков
         onClickHeader = null,
         styleHeaderRow = null, // Стиль для строки заголовка

         clbStyleCell,
         clbCell, // Для ячеек
         onClickCell = null,
         clbStyleRow = null, // Стиль для строки

         arrWidthColumn, // Массив ширин для колонки

         className,

         clbLoadMore,
         clbLoadMoreAbove,

         arrColExcludes = [],

         clbFilter,
     }, ref) => {

        const [isEndData, setIsEndData] = useState(false);

        const refArrNodes = useRef([]);

        const lastIndexHeader = (arrHeader?.length ?? 1) - 1 - arrColExcludes.length;

        const arrGridTemplateColumns = arrHeader
            .map((_, i) => arrWidthColumn?.[i] ? arrWidthColumn[i] : 'minmax(max-content, 1fr)')
            .map((it, i) => arrColExcludes.includes(i) ? 0 : it)

        const getRow = (row: number, arrCell: any[]) => <React.Fragment key={`row-${row}`}>
            <div
                className={clsx(
                    "grid",
                    // 'w-full',
                    clbStyleRow && (clbStyleRow({rowIndex: row}) || ''),
                )}
                style={{gridTemplateColumns: arrGridTemplateColumns.join(' ')}}
            >{
                arrHeader.map((name, colIndex) => {
                    const _clbCell = clbCell?.({
                        colIndex,
                        rowIndex: row,
                        value: arrCell[colIndex],
                        arrRow: arrCell,
                        arrNodes: refArrNodes.current
                    });
                    return <div
                        ref={(node: HTMLElement | null) => {
                            if (!refArrNodes.current?.[row]) refArrNodes.current[row] = [];
                            refArrNodes.current[row][colIndex] = node;
                            // console.log(refArrNodes.current)
                        }}
                        // title={arrCell[colIndex]?.toString()}
                        role={"cell-" + name}
                        key={`cell-${row}-${colIndex}`}
                        className={clsx(
                            arrGridTemplateColumns[colIndex] == 0 && 'invisible',
                            clbStyleCell &&
                            (clbStyleCell({colIndex: colIndex, rowIndex: row, value: arrCell[colIndex]}) || '')
                        )}
                        style={arrGridTemplateColumns[colIndex] == 0 ? {
                            width: 0,
                            padding: 0,
                            margin: 0,
                            border: 0,
                        } : {}}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                            onClickCell && onClickCell({
                                e,
                                rowIndex: row,
                                colIndex,
                                key: name,
                                value: name,
                                arrRow: arrCell
                            })
                        }
                        onMouseOver={(e) => {
                            const element = e.target as HTMLElement;
                            const isOver = element.scrollWidth > element.clientWidth;
                            element.title = isOver ? arrCell[colIndex]?.toString() : '';
                        }}
                    >
                        {_clbCell ?? arrCell[colIndex]?.toString()}
                    </div>;
                })}</div>
        </React.Fragment>;

        return (
            <div
                ref={ref}
                role="table"
                className={clsx(
                    // 'h-full',
                    // 'w-full',
                    'content-start',
                    'text-[#002033BF]',
                    'bg-#e2e8f0',
                    className,
                    'overflow-auto',
                )}
            >
                <div className="relative">

                    {/* Заголовки таблицы */}
                    <div className="sticky top-0 grid z-1"
                         style={{gridTemplateColumns: arrGridTemplateColumns.join(' ')}}
                    >
                        {arrHeader.map((name, index) => {
                            // Выбираем компонент в зависимости от обработчика
                            let styleHeader: string = clbStyleHeader
                                ? clbStyleHeader({colIndex: index, value: name})
                                : lastIndexHeader != index ? 'border-r border-r-[#0020331a]' : 'border-0';
                            let content: any = clbHeader ? clbHeader({colIndex: index, value: name}) : name;

                            return (
                                <div
                                    role={`header-${index}-${name}`}
                                    key={`header-${index}`}
                                    className={clsx(
                                        'top-0', //freeze header
                                        styleHeaderRow ?? 'text-[11px] bg-[#F0F2F3]'
                                    )}>
                                    <div
                                        role={"header-cell-" + index}
                                        className={clsx(
                                            arrGridTemplateColumns[index] == 0 && 'invisible',
                                            'flex flex-row items-center',
                                            'h-full ',
                                            // 'pl-[10px] pr-[5px] gap-[5px]',
                                            ' justify-between truncate',
                                            styleHeader,
                                        )}
                                        style={arrGridTemplateColumns[index] == 0 ? {
                                            width: 0,
                                            padding: 0,
                                            margin: 0,
                                            border: 0,
                                        } : {}}
                                        onClick={(e: React.MouseEvent<HTMLDivElement>) => onClickHeader && onClickHeader({
                                            e,
                                            colIndex: index,
                                            key: name,
                                            value: name
                                        })}
                                    >
                                        {content}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Ячейки таблицы */}
                    {clbLoadMore
                        ? <InfiniteRows
                            parentRef={ref as React.MutableRefObject<null>}
                            arrRow={arrTable}
                            clbLoadMore={clbLoadMore}
                            clbLoadMoreAbove={clbLoadMoreAbove}
                            loadThreshold={5}
                            onEndData={() => setIsEndData(true)}
                            renderRow={(row, index) => {
                                // if (i == 0) requestAnimationFrame(() => onIndexChange && onIndexChange(index));
                                // if (!row && !isEndData) return <div className="animate-pulse">Загрузка...</div>; //TODO: отключать если cursor null
                                if (!row) return null;
                                if (clbFilter && !clbFilter({rowIndex: index, arrRow: row})) return null;
                                // if (!row[3].includes('Газпромнефть-ННГ')) return null;
                                return getRow(index, row);
                            }}
                            // onIndexChange={(index: number) => onIndexChange && onIndexChange(index)}
                        />
                        : arrTable.map((arrCell, rowIndex) => {
                            return getRow(rowIndex, arrCell);
                        })

                    }
                </div>
            </div>
        );
    })

export default Table;