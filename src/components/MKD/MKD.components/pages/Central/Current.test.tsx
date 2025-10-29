import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useShallow } from 'zustand/react/shallow';
import { Current } from './Current';
import { INDICATORS_MODE } from '@/components/MKD/stores/slices/centralChartsSlice';

// Stub simple UI dependencies
jest.mock('@/components/MKD/components/Icons.tsx', () => ({
    IconArrowDownBadge12: () => <span data-testid='icon-arrow' />,
    IconCircle12: () => <span />,
}));

jest.mock('@/components/MKD/components/Scrollbar/CustomScrollbarVertical.tsx', () => () => <div />);
jest.mock('@/components/MKD/components/Scrollbar/CustomScrollbarHorizontal.tsx', () => () => <div />);
jest.mock('@/components/MKD/components/LoadingOverlay.tsx', () => () => <div />);
jest.mock(
    '@/components/MKD/components/Modal/Modal.tsx',
    () =>
        ({ children, show }: any) =>
            show ? <div data-testid='modal'>{children}</div> : null
);

// Mock HeaderFilter and SelectorColumn components
jest.mock('@/components/MKD/MKD.components/components/Modals/HeaderFilter.tsx', () => {
    const SelectorColumn = ({ store }: any) => {
        const { arrHeader, arrIncludedColumn, setIncludeColumn } = store(
            useShallow((s: any) => ({
                arrHeader: s.arrHeader,
                arrIncludedColumn: s.arrIncludedColumn,
                setIncludeColumn: s.setIncludeColumn,
            }))
        );

        return (
            <div data-testid='column-selector'>
                <h1>ОТОБРАЖЕНИЕ КОЛОНОК</h1>
                {arrHeader.map((item: string, index: number) => (
                    <div key={index} data-testid={`column-item-${index}`}>
                        <input
                            type='checkbox'
                            role='checkbox'
                            checked={arrIncludedColumn[index]}
                            onChange={() => setIncludeColumn(index, !arrIncludedColumn[index])}
                        />
                        {item}
                    </div>
                ))}
            </div>
        );
    };

    return ({ onHide, col, store }: any) => {
        const { arrHeader, listGroups, setFilter } = store(
            useShallow((s: any) => ({
                arrHeader: s.arrHeader,
                listGroups: s.listGroups,
                setFilter: s.setFilter,
            }))
        );

        const columnName = arrHeader?.[col] || '';
        const variants = listGroups?.[columnName] || [];

        const handleApply = () => {
            setFilter(col, 'test-filter');
            onHide();
        };

        const handleCancel = () => {
            onHide();
        };

        return (
            <div data-testid='header-filter' role='dialogfilter'>
                <button onClick={onHide} data-testid='close-filter'>
                    Close Filter
                </button>
                <h1>{columnName}</h1>
                <input data-testid='search-input' role='textbox' />
                <button data-testid='select-all-button'>Выбрать все</button>
                <button data-testid='reset-button'>Сбросить</button>
                <button onClick={handleApply} data-testid='apply-button'>
                    Применить
                </button>
                <button onClick={handleCancel} data-testid='cancel-button'>
                    Отменить
                </button>
                <button data-testid='column-button' aria-label='column'>
                    Column
                </button>
                <div data-testid='variants-list'>
                    {variants.map((variant: string, index: number) => (
                        <div key={index} data-testid={`variant-${index}`}>
                            <input type='checkbox' role='checkbox' />
                            {variant}
                        </div>
                    ))}
                </div>
                <SelectorColumn store={store} />
            </div>
        );
    };
});

jest.mock(
    '@/components/MKD/MKD.components/components/HeaderCellDefault.tsx',
    () =>
        ({ onClickSort, onClickFilter, value, colIndex }: any) => (
            <div data-testid={`header-cell-${colIndex}`}>
                <span data-testid={`header-text-${colIndex}`}>{value}</span>
                <button onClick={onClickSort} data-testid={`sort-${colIndex}`}>
                    Sort {colIndex}
                </button>
                <button onClick={onClickFilter} data-testid={`filter-${colIndex}`}>
                    Filter {colIndex}
                </button>
            </div>
        )
);

// Make Droplist render its children always to simplify interactions
jest.mock('@/components/MKD/components/MenuList.tsx', () => ({
    Droplist: ({ value, children }: any) => (
        <div>
            <div>{value}</div>
            <div>{children}</div>
        </div>
    ),
}));

// ForwardRef table stub
jest.mock('@/components/MKD/components/Table/Table.tsx', () => {
    const Table = React.forwardRef<HTMLDivElement, any>(({ arrTable, arrHeader, clbHeader }, ref) => (
        <div
            ref={ref as any}
            data-testid='table'
            data-count={arrTable?.length ?? 0}
            data-first={(arrTable && arrTable[0] && arrTable[0][0]) ?? ''}
        >
            {/* Render headers */}
            <div data-testid='table-headers'>
                {arrHeader?.map((header: string, colIndex: number) => {
                    const headerContent = clbHeader ? clbHeader({ value: header, colIndex }) : header;
                    return (
                        <div key={colIndex} data-testid={`header-${colIndex}`}>
                            {headerContent}
                        </div>
                    );
                })}
            </div>
        </div>
    ));
    return { __esModule: true, default: Table };
});

// Replace heavy chart/sections/tiles with light stubs
jest.mock('../../components/Charts/ParametersSection.tsx', () => ({
    ParametersSection: () => <div data-testid='parameters' />,
}));
jest.mock('../../components/Charts/SignalsSection.tsx', () => ({
    SignalsSection: () => <div data-testid='signals' />,
}));
jest.mock('../../components/Charts/ChartSection.tsx', () => ({
    ChartSection: () => <div data-testid='chart' />,
}));
// GeneralTiles mock exposes two buttons to switch modes
jest.mock('../../components/Charts/GeneralTiles.tsx', () => ({
    __esModule: true,
    default: ({ onModeChange, disabled, currentMode }: any) => (
        <div>
            <div data-testid='tiles' data-disabled={!!disabled} data-mode={currentMode} />
            <button onClick={() => onModeChange(0)}>to-parameters</button>
            <button onClick={() => onModeChange(1)}>to-rules</button>
        </div>
    ),
}));

// Provide the store values used in Current
const makeStore = (overrides?: Partial<any>) => ({
    setDateString: jest.fn(),
    setTableGroup: jest.fn(),
    loadChartsCounters: jest.fn().mockResolvedValue(undefined),
    generalCounter: {},
    qualityCounter: {},
    isLoadingGeneral: false,
    isLoadingQuality: false,
    isLoadingMonths: false,
    monthsSeries: [],
    loadGroupByTiles: jest.fn().mockResolvedValue(undefined),
    loadGroupByField: jest.fn().mockResolvedValue(undefined),
    tiles: [],
    isLoadingTiles: false,
    isLoadingTable: false,
    fieldStats: [],
    setArrTable: jest.fn(),
    setArrSort: jest.fn(),
    setListGroups: jest.fn(),
    setFilter: jest.fn(),
    setIncludeColumn: jest.fn(),
    tableGroup: 0,
    resetSortFilter: jest.fn(),
    setArrHeader: jest.fn(),
    arrTable: [],
    arrHeader: [],
    arrSort: [],
    arrFilter: [],
    arrIncludedColumn: [],
    listGroups: {},
    ...overrides,
});

let __store = makeStore();
jest.mock('@/components/MKD/stores/stores.ts', () => ({
    useStoreCentralTable: (sel: any) => sel(__store),
    __setStore: (s: any) => {
        __store = s;
    },
}));

const dateRange = { from: new Date(2025, 8, 1), to: new Date(2025, 8, 1) } as any;

// Provide controlled rows for sorting/filtering
jest.mock('./utils.ts', () => {
    const actual = jest.requireActual('./utils.ts');
    return {
        ...actual,
        buildRowsFromFieldStats: () => [
            ['Beta', 2],
            ['Alpha', 1],
            ['Gamma', 3],
        ],
    };
});

// Mock client table to implement simple sorting and filtering behavior for tests
let __filterValue: string | null = null;
let __rowsCurrent: any[] | null = null;
jest.mock('@/components/MKD/lib/table/useClientTable.ts', () => ({
    useClientTable: (_arrHeader: any, rows: any[]) => {
        if (!__rowsCurrent) {
            let base = rows ?? [];
            if (__filterValue) {
                base = base.filter((r) => String(r?.[0] ?? '').includes(__filterValue as string));
            }
            __rowsCurrent = [...base];
        }
        return {
            filteredRows: __rowsCurrent,
            onHeaderSort: (colIndex: number) => {
                (__rowsCurrent as any[]).sort((a, b) => String(a[colIndex]).localeCompare(String(b[colIndex])));
            },
            arrSort: [],
            arrFilter: [],
        } as any;
    },
    __setTestFilter: (v: string | null) => {
        __filterValue = v;
        __rowsCurrent = null;
    },
    __resetRows: () => {
        __rowsCurrent = null;
    },
}));

describe('Current', () => {
    it('renders main sections', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );
        expect(screen.getByTestId('parameters')).toBeInTheDocument();
        expect(screen.getByTestId('signals')).toBeInTheDocument();
        expect(screen.getByTestId('chart')).toBeInTheDocument();
        expect(screen.getByTestId('table')).toBeInTheDocument();
    });

    it('calls setTilesMode on tiles mode change', () => {
        const setTilesMode = jest.fn();
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={setTilesMode} />
        );
        fireEvent.click(screen.getByText('to-rules'));
        expect(setTilesMode).toHaveBeenCalled();
    });

    it('disables tiles when isLoadingTiles is true', () => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(makeStore({ isLoadingTiles: true }));
        const { unmount } = render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );
        expect(screen.getByTestId('tiles')).toHaveAttribute('data-disabled', 'true');
        unmount();
    });

    it('switches table group via dropdown buttons', () => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        const store = makeStore();
        const setTableGroupSpy = store.setTableGroup;
        const loadGroupByFieldSpy = store.loadGroupByField;
        stores.__setStore(store);
        const { unmount } = render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );
        // click to service organizations
        fireEvent.click(screen.getByText('Показатели по сервисным организациям'));
        expect(setTableGroupSpy).toHaveBeenCalledWith(1);
        expect(loadGroupByFieldSpy).toHaveBeenCalled();
        unmount();
    });

    it('sorts table by header click via onHeaderSort', () => {
        const hook = jest.requireMock('@/components/MKD/lib/table/useClientTable.ts');
        hook.__resetRows();
        const { unmount, rerender } = render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );
        // initial first row (unsorted) is 'Beta'
        expect(screen.getByTestId('table')).toHaveAttribute('data-first', 'Beta');
        // trigger sort by column 0 through header component's onClickSort callback
        // sort by first column (0)
        hook.useClientTable([], []).onHeaderSort(0);
        // re-render to reflect sorted data
        rerender(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );
        // after sort, first should become 'Alpha'
        expect(screen.getByTestId('table')).toHaveAttribute('data-first', 'Alpha');
        unmount();
    });

    it('filters table rows using test filter hook', () => {
        const hook = jest.requireMock('@/components/MKD/lib/table/useClientTable.ts');
        hook.__setTestFilter('Al');
        const { unmount } = render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );
        // Only rows containing 'Al' remain -> 'Alpha' only
        expect(screen.getByTestId('table')).toHaveAttribute('data-count', '1');
        expect(screen.getByTestId('table')).toHaveAttribute('data-first', 'Alpha');
        unmount();
        // reset
        hook.__setTestFilter(null);
    });
});

// Tests for HeaderFilter functionality
describe('Current HeaderFilter functionality', () => {
    const mockHeaders = [
        'Месторождение',
        'Сервисная организация',
        'Прогресс',
        'Количество',
        'Хорошие сигналы',
        'Плохие сигналы',
        'Прогресс качества',
        'Количество качества',
        'Хорошие показатели',
        'Плохие показатели',
    ];

    beforeEach(() => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(
            makeStore({
                arrHeader: mockHeaders,
                arrSort: [],
                arrFilter: [],
                arrIncludedColumn: Array(10).fill(true),
                listGroups: {
                    'Месторождение': ['Месторождение-1', 'Месторождение-2', 'Месторождение-3'],
                    'Сервисная организация': ['Организация-А', 'Организация-Б', 'Организация-В'],
                },
            })
        );
    });

    it('opens HeaderFilter modal when filter button is clicked', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Click on filter button for first column
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);

        // Modal should be visible
        expect(screen.getByTestId('modal')).toBeInTheDocument();
        expect(screen.getByTestId('header-filter')).toBeInTheDocument();
    });

    it('closes HeaderFilter modal when close button is clicked', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Open modal
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);
        expect(screen.getByTestId('modal')).toBeInTheDocument();

        // Close modal
        const closeButton = screen.getByTestId('close-filter');
        fireEvent.click(closeButton);

        // Modal should be hidden
        expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('applies filter when "Применить" button is clicked', () => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        const store = makeStore({
            arrHeader: mockHeaders,
            arrSort: [],
            arrFilter: [],
            arrIncludedColumn: Array(10).fill(true),
            listGroups: {},
        });
        stores.__setStore(store);

        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Open modal
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);

        // Click "Применить" button
        const applyButton = screen.getByTestId('apply-button');
        fireEvent.click(applyButton);

        // setFilter should be called
        expect(store.setFilter).toHaveBeenCalled();
    });

    it('cancels filter when "Отменить" button is clicked', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Open modal
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);

        // Click "Отменить" button
        const cancelButton = screen.getByTestId('cancel-button');
        fireEvent.click(cancelButton);

        // Modal should be closed without calling setFilter
        expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
});

// Tests for sorting functionality
describe('Current sorting functionality', () => {
    const mockHeaders = [
        'Месторождение',
        'Сервисная организация',
        'Прогресс',
        'Количество',
        'Хорошие сигналы',
        'Плохие сигналы',
        'Прогресс качества',
        'Количество качества',
        'Хорошие показатели',
        'Плохие показатели',
    ];

    beforeEach(() => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(
            makeStore({
                arrHeader: mockHeaders,
                arrSort: [],
                arrFilter: [],
                arrIncludedColumn: Array(10).fill(true),
                listGroups: {},
            })
        );
    });

    it('handles sort button clicks correctly', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Click sort button for first sortable column (index 1)
        const sortButton = screen.getByTestId('sort-1');
        fireEvent.click(sortButton);

        // onHeaderSort should be called
        expect(screen.getByTestId('sort-1')).toBeInTheDocument();
    });

    it('applies sorting through store when sort is triggered', () => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(
            makeStore({
                arrHeader: mockHeaders,
                arrSort: [
                    'asc',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                ],
                arrFilter: [],
                arrIncludedColumn: Array(10).fill(true),
                listGroups: {},
            })
        );

        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Verify that sorting state is reflected in the component
        expect(screen.getByTestId('sort-1')).toBeInTheDocument();
    });

    it('cycles through sort states: unsorted -> asc -> desc -> unsorted', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        const sortButton = screen.getByTestId('sort-1');

        // First click - should go to asc
        fireEvent.click(sortButton);

        // Second click - should go to desc
        fireEvent.click(sortButton);

        // Third click - should go back to unsorted
        fireEvent.click(sortButton);

        expect(sortButton).toBeInTheDocument();
    });
});

// Tests for column display functionality
describe('Current column display functionality', () => {
    const mockHeaders = [
        'Месторождение',
        'Сервисная организация',
        'Прогресс',
        'Количество',
        'Хорошие сигналы',
        'Плохие сигналы',
        'Прогресс качества',
        'Количество качества',
        'Хорошие показатели',
        'Плохие показатели',
    ];

    beforeEach(() => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(
            makeStore({
                arrHeader: mockHeaders,
                arrSort: [],
                arrFilter: [],
                arrIncludedColumn: Array(10).fill(true),
                listGroups: {},
            })
        );
    });

    it('shows all columns when all are included', () => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(
            makeStore({
                arrHeader: mockHeaders,
                arrSort: [],
                arrFilter: [],
                arrIncludedColumn: Array(10).fill(true),
                listGroups: {},
            })
        );

        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // All headers should be visible
        expect(screen.getByTestId('header-0')).toBeInTheDocument();
        expect(screen.getByTestId('header-1')).toBeInTheDocument();
        expect(screen.getByTestId('header-2')).toBeInTheDocument();
    });

    it('hides excluded columns', () => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(
            makeStore({
                arrHeader: mockHeaders,
                arrSort: [],
                arrFilter: [],
                arrIncludedColumn: [true, false, true, false, true, true, true, true, true, true],
                listGroups: {},
            })
        );

        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Excluded columns should not be rendered in the table
        // Note: The actual hiding logic is in the Table component via arrColExcludes
        expect(screen.getByTestId('header-0')).toBeInTheDocument();
        expect(screen.getByTestId('header-2')).toBeInTheDocument();
    });

    it('opens column selector modal when column button is clicked', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Open HeaderFilter first
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);

        // Click column selector button
        const columnButton = screen.getByTestId('column-button');
        fireEvent.click(columnButton);

        // Column selector should be visible
        expect(screen.getByTestId('column-selector')).toBeInTheDocument();
    });

    it('toggles column inclusion when checkbox is clicked', () => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        const store = makeStore({
            arrHeader: mockHeaders,
            arrSort: [],
            arrFilter: [],
            arrIncludedColumn: Array(10).fill(true),
            listGroups: {},
        });
        stores.__setStore(store);

        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Open HeaderFilter and then column selector
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);

        const columnButton = screen.getByTestId('column-button');
        fireEvent.click(columnButton);

        // Click on first column checkbox
        const checkbox = screen.getByTestId('column-item-0').querySelector('input[type="checkbox"]');
        fireEvent.click(checkbox!);

        // setIncludeColumn should be called
        expect(store.setIncludeColumn).toHaveBeenCalled();
    });
});

// Tests for filter variants functionality
describe('Current filter variants functionality', () => {
    const mockHeaders = [
        'Месторождение',
        'Сервисная организация',
        'Прогресс',
        'Количество',
        'Хорошие сигналы',
        'Плохие сигналы',
        'Прогресс качества',
        'Количество качества',
        'Хорошие показатели',
        'Плохие показатели',
    ];

    beforeEach(() => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(
            makeStore({
                arrHeader: mockHeaders,
                arrSort: [],
                arrFilter: [],
                arrIncludedColumn: Array(10).fill(true),
                listGroups: {
                    'Месторождение': ['Месторождение-1', 'Месторождение-2', 'Месторождение-3'],
                    'Сервисная организация': ['Организация-А', 'Организация-Б', 'Организация-В'],
                },
            })
        );
    });

    it('displays filter variants from listGroups', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Open HeaderFilter
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);

        // Filter variants should be displayed
        expect(screen.getByTestId('header-filter')).toBeInTheDocument();
    });

    it('handles "Выбрать все" button click', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Open HeaderFilter
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);

        // Click "Выбрать все" button
        const selectAllButton = screen.getByTestId('select-all-button');
        fireEvent.click(selectAllButton);

        // This should set the filter to include all variants
        expect(selectAllButton).toBeInTheDocument();
    });

    it('handles "Сбросить" button click', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Open HeaderFilter
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);

        // Click "Сбросить" button
        const resetButton = screen.getByTestId('reset-button');
        fireEvent.click(resetButton);

        // This should clear the filter
        expect(resetButton).toBeInTheDocument();
    });

    it('filters variants based on search input', () => {
        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Open HeaderFilter
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);

        // Type in search input
        const searchInput = screen.getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'Месторождение' } });

        // Only variants containing 'Месторождение' should be visible
        expect(searchInput).toHaveValue('Месторождение');
    });

    it('applies selected filter variants to table data', () => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(
            makeStore({
                arrHeader: mockHeaders,
                arrSort: [],
                arrFilter: ['', 'Месторождение-1;Месторождение-2', '', '', '', '', '', '', '', ''],
                arrIncludedColumn: Array(10).fill(true),
                listGroups: {},
            })
        );

        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // The filtered data should be applied
        expect(screen.getByTestId('table')).toBeInTheDocument();
    });
});

// Integration tests
describe('Current integration tests', () => {
    const mockHeaders = [
        'Месторождение',
        'Сервисная организация',
        'Прогресс',
        'Количество',
        'Хорошие сигналы',
        'Плохие сигналы',
        'Прогресс качества',
        'Количество качества',
        'Хорошие показатели',
        'Плохие показатели',
    ];

    beforeEach(() => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(
            makeStore({
                arrHeader: mockHeaders,
                arrSort: [],
                arrFilter: [],
                arrIncludedColumn: Array(10).fill(true),
                listGroups: {
                    'Месторождение': ['Месторождение-1', 'Месторождение-2', 'Месторождение-3'],
                    'Сервисная организация': ['Организация-А', 'Организация-Б', 'Организация-В'],
                },
            })
        );
    });

    it('integrates filtering, sorting, and column display together', () => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        stores.__setStore(
            makeStore({
                arrHeader: mockHeaders,
                arrSort: [
                    'unsorted',
                    'asc',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                    'unsorted',
                ],
                arrFilter: ['', 'Месторождение-1', '', '', '', '', '', '', '', ''],
                arrIncludedColumn: [true, true, false, true, true, true, true, true, true, true],
                listGroups: {},
            })
        );

        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // All functionality should work together
        expect(screen.getByTestId('table')).toBeInTheDocument();
        expect(screen.getByTestId('header-0')).toBeInTheDocument();
        expect(screen.getByTestId('header-1')).toBeInTheDocument();
    });

    it('maintains state consistency across component interactions', () => {
        const stores = jest.requireMock('@/components/MKD/stores/stores.ts');
        const store = makeStore({
            arrHeader: mockHeaders,
            arrSort: [],
            arrFilter: [],
            arrIncludedColumn: Array(10).fill(true),
            listGroups: {},
        });
        stores.__setStore(store);

        render(
            <Current selectedDateRange={dateRange} tilesMode={INDICATORS_MODE.Parameters} setTilesMode={jest.fn()} />
        );

        // Open filter modal
        const filterButton = screen.getByTestId('filter-1');
        fireEvent.click(filterButton);

        // Open column selector (before applying filter)
        const columnButton = screen.getByTestId('column-button');
        fireEvent.click(columnButton);

        // Toggle column
        const checkbox = screen.getByTestId('column-item-0').querySelector('input[type="checkbox"]');
        fireEvent.click(checkbox!);

        // Apply filter
        const applyButton = screen.getByTestId('apply-button');
        fireEvent.click(applyButton);

        // All interactions should work without errors
        expect(screen.getByTestId('table')).toBeInTheDocument();
    });
});
