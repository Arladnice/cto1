export type Sorting = 'unsorted' | 'asc' | 'desc';

const arrSortGroup = ['unsorted', 'asc', 'desc'] as Sorting[];

// sortSlice.ts
export interface FilterSortSlice {
    arrFilter: string[];
    setFilter: (col: number, filter: string) => void;

    arrSort: Sorting[];
    setArrSort: (col: number, sort: Sorting) => void;
    sortSwitch: (col: number) => void;

    updateSort: () => void;
    resetSortFilter: () => void;
}

export const createFilterSortSlice = (set: any, get: any): FilterSortSlice => ({
    arrSort: [],
    arrFilter: [],
    setFilter: (col, filter) => {
        set((s: FilterSortSlice) => {
            s.arrFilter[col] = filter;
        });
        get().reset?.();
    },
    resetSortFilter: () => {
        set((s: any) => {
            s.arrSort = [];
            s.arrFilter = [];
        });
        get().reset?.();
    },
    setArrSort: (col, sort) =>
        set((s: any) => {
            s.arrSort = [];
            s.arrSort[col] = sort;
        }),
    updateSort: () =>
        set((s: any) => {
            const col = s.arrSort.findIndex((it: any) => Boolean(it));
            if (col == -1) return;
            const sort = s.arrSort[col];

            console.log('sort', sort);

            if (sort == 'unsorted') {
                s.arrTable.sort((a: any, b: any) => a[1] - b[1]);
            }
            if (sort == 'asc') {
                s.arrTable.sort((a: any, b: any) => a[col].localeCompare(b[col]));
            }
            if (sort == 'desc') {
                s.arrTable.sort((a: any, b: any) => b[col].localeCompare(a[col]));
            }
        }),
    sortSwitch: (col) => {
        set((s: any) => {
            const curSort = s.arrSort[col] ?? 'unsorted';
            const curIndex = arrSortGroup.indexOf(curSort);
            s.arrSort[col] = arrSortGroup[curIndex + 1 >= arrSortGroup.length ? 0 : curIndex + 1];
            console.log(col, curSort);
        });
        get().reset?.();
    },
});
