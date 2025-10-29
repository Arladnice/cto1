// tableSlice.ts

export interface TableSlice {

    arrFilter: string[];
    setFilter: (col: number, filter: string) => void;

    arrTable: any[][]
    setArrTable: (arrTable: any[][]) => void
    addArrRows: (arrTable: any[][]) => void
    addTableRow: (arrRow: any[]) => void
    setTableRow: (row: number, arrRow: any[]) => void
    setTableCell: (col: number, row: number, cellValue: any) => void
}

export const createTableSlice = (set: any, get: any): TableSlice => ({
    arrTable: [],
    arrFilter: [],
    setFilter: (col, filter) => set((state: any) => {
        state.arrFilter[col] = filter;
    }),
    setArrTable: (arrTable) => set((state: any) => {
        state.arrTable = arrTable
    }),
    addArrRows: (arrTable) => set((state: any) => {
        state.arrTable = state.arrTable.concat(arrTable)
    }),
    addTableRow: (arrRow) => set((state: any) => {
        state.arrTable.push(arrRow)
    }),
    setTableRow: (row, arrRow) => set((state: any) => {
        state.arrTable[row] = arrRow
    }),
    setTableCell: (col, row, cellValue) => set((state: any) => {
        state.arrTable[row][col] = cellValue
    })
})