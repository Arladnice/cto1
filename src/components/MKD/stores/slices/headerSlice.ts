// headerSlice.ts

export interface HeaderSlice {
    arrHeader: string[];
    arrIncludedColumn: boolean[];
    listHeaderIndex: Record<string, number | string>;
    setArrHeader: (arrHeader: string[]) => void;
    setIncludeColumn: (col: number, checked: boolean) => void;
    setListHeaderIndex: (fieldMapArchive: Record<string, any>) => void;
    resetIncludeColumn: () => void;
}

export const createHeaderSlice = (set: any, _get: any): HeaderSlice => ({
    arrHeader: [],
    arrIncludedColumn: [],
    listHeaderIndex: {},
    setArrHeader: (arrHeader) =>
        set((state: any) => {
            state.arrHeader = arrHeader;
            const needInit =
                !Array.isArray(state.arrIncludedColumn) || state.arrIncludedColumn.length !== arrHeader.length;
            if (needInit) {
                state.arrIncludedColumn = new Array(arrHeader.length).fill(true);
            }

            arrHeader.forEach((name: string, index: number) => {
                state.listHeaderIndex[name] = index;
            });
        }),

    setListHeaderIndex: (fieldMapArchive: Record<string, any>) =>
        set((s: any) => {
            Object.entries(fieldMapArchive).forEach(([name, rusName]: string[], index: number) => {
                s.listHeaderIndex[name] = index;
                s.listHeaderIndex[index] = name;
                s.listHeaderIndex[rusName] = index;
            });
        }),

    setIncludeColumn: (col: number, checked: boolean) =>
        set((state: any) => {
            if (!Array.isArray(state.arrIncludedColumn)) state.arrIncludedColumn = [];
            state.arrIncludedColumn[col] = checked;
        }),
    resetIncludeColumn: () =>
        set((state: any) => {
            state.arrIncludedColumn = [];
        }),
});
