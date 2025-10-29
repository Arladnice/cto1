// FilterCardCreateSlice.ts

export interface FilterCardCreateSlice {
    filterName: string;
    setFilterName: (filterName: string) => void;

}

export const createFilterCardCreateSlice = (set: any, get: any): FilterCardCreateSlice => ({
    filterName: '',

    setFilterName: (filterName: string) => set(s => {
        s.filterName = filterName;
    }),
})

