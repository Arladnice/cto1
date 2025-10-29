// Archive Table Slice.ts

import {fieldMapArchive} from "@/components/MKD/MKD.components/Archive.tsx";
import {getHashCyrb53Arr} from "@/lib/utils.ts";
import {DateRange} from "@/components/MKD/components/DatePickerPeriod/datePicker.types.ts";
import {formatDateTime} from "@/components/MKD/components/DatePickerPeriod/utils.ts";
import {StoreArchive} from "@/components/MKD/stores/stores.ts";

import {AggregationApi, Configuration, DataApi, QcmApi, UpdateQcmDto, CreateQcmDto} from "@/api/generated";

const configuration = new Configuration({basePath: ' '});
const apiInstance = new DataApi(configuration);
const aggregationApi = new AggregationApi(configuration);
const qcmApi = new QcmApi(configuration);
let createQcmDto: CreateQcmDto; // (optional)


let cursor: number = 0;

export interface ListFilters {
    id: number;
    filterNames: string[];
}

export interface ArchiveTableSlice {
    loadTableData: () => void;

    cnt: number;

    listQuality: Record<number, any>;
    setListQuality: (id: number, data: any) => void;
    getListQuality: (id: number) => void;

    listFilter: Record<number, any[]>;
    setListFilter: (id: number, arr: []) => void;
    getListFilter: (id: number) => Promise<ListFilters>;

    arrTable: any[][];
    setArrTable: (arrTable: any[][]) => void;
    addArrRows: (arrTable: any[][]) => void;
    addTableRow: (arrRow: any[]) => void;
    setTableRow: (row: number, arrRow: any[]) => void;
    setTableCell: (col: number, row: number, cellValue: any) => void;

    dateRange: DateRange | null;
    setDateRange: (dr: DateRange) => void;

    reset: () => void;
}

export const createArchiveTableSlice = (set: any, get: any): ArchiveTableSlice => ({
    arrTable: [],
    listQuality: {},
    listFilter: {},
    dateRange: null,
    cnt: 0,

    reset: () => set((s: StoreArchive) => {
        s.arrTable = [];
        listCursorReqTableData.clear();
        listHashReqQuality.clear();
        cursor = 0;
    }),

    setDateRange: (dr: DateRange) => {
        if (!get().dateRange) {
            set((s: StoreArchive) => {
                s.dateRange = dr;
            });
            return;
        }

        set((s: StoreArchive) => {
            s.dateRange = dr;
        });

        get().reset();
    },

    setArrTable: (arrTable) => set((s: StoreArchive) => {
        s.arrTable = arrTable;
    }),
    addArrRows: (arrTable) => set((s: StoreArchive) => {
        s.arrTable = s.arrTable.concat(arrTable);
    }),
    addTableRow: (arrRow) => set((s: StoreArchive) => {
        s.arrTable.push(arrRow);
    }),
    setTableRow: async (row, arrRow) => {

        let s = get();
        let listToWrite: UpdateQcmDto = {};
        let listHeaderIndex = s.listHeaderIndex;
        for (let index = 1; index < arrRow.length; index++) {
            const item = arrRow[index];
            const key = listHeaderIndex[index];
            listToWrite[key] = item;
        }

        let id = s.arrTable[row][1];
        const {status, data} = await qcmApi.apiQcmIdPatch(id, listToWrite);
        if (status == 204) {
            set((s: StoreArchive) => {
                s.arrTable[row] = arrRow; // optimistic update
            });
        } else {
            console.error(status, data);
        }
    },
    setTableCell: (col, row, cellValue) => set((s: StoreArchive) => {
        try {
            s.arrTable[row][col] = cellValue;
        } catch (e) {
            console.warn(row, col, cellValue, s.arrTable);
        }
    }),

    loadTableData: async () => {

        const s = get() as StoreArchive;

        /*Сортировка подготовка параметров*/
        let arrSort = s.arrSort.map(it => it == 'unsorted' ? null : it);
        let arrSortBy = arrSort.map((sort, index) => {
            return s?.listHeaderIndex?.[index] ?? null;
        }).filter((it, i) => arrSort[i]);
        arrSort = arrSort.filter(Boolean);


        if (cursor == null) return;
        if (listCursorReqTableData.has(cursor)) return true;
        listCursorReqTableData.add(cursor);

        const arrHeader = Object.values(fieldMapArchive);
        const arrField = Object.keys(fieldMapArchive);

        let arrParam = s.arrFilter.map((it: string | null) => it?.split(';')).splice(2);

        // @ts-ignore
        // arrParam.push({upd: Date.now()}); // uncached

        const dataApi = await apiInstance.apiDataGetQcmsGet(cursor, 50, arrSortBy as string[], arrSort, ...arrParam);
        const {status, data: {items, nextCursor}} = dataApi;
        if (status != 200) console.error(status);

        cursor = nextCursor;

        const arrIDsPar = [];
        const arr = items.map((it: any) => {
            const arrKV = Object.entries(it);
            arrIDsPar.push(it.id);
            const _arr = [];
            _arr[0] = false;
            arrKV.forEach(([k, v]) => {
                const index = arrField.indexOf(k);
                if (index == -1) console.error(`Такого поля нет: ${k}`)
                _arr[index] = v;
            })
            return _arr;
        });

        s.setArrHeader(arrHeader);
        s.addArrRows(arr);
    },

    setListQuality: (id, data) => set((s: StoreArchive) => {
        s.listQuality[id] = data;
    }),

    getListQuality: async (id: number) => {

        if (id == -1) {
            listHashReqQuality.clear();
            set((s: StoreArchive) => {
                s.listQuality = [];
            });
        }

        const s = get() as ArchiveTableSlice;
        const arrParam = [id, formatDateTime(s.dateRange.from, 'yyyy-mm-dd'), formatDateTime(s.dateRange.to, 'yyyy-mm-dd')];
        // const arrParam = [id, '2025-08-01', '2025-08-05'];

        const hash = getHashCyrb53Arr(arrParam);
        if (listHashReqQuality.has(hash)) return;
        listHashReqQuality.add(hash);


        // @ts-ignore
        const {data: {endpointsData}} = await aggregationApi.apiDataEndpointsPost(...arrParam);

        const arrPromise = endpointsData.map(({idPar, date, agg, group}) => {
            return apiInstance.apiDataGetDataGet(idPar, date, agg, group);
        })

        const arrData = await Promise.all(arrPromise);

        const resSum = {badCounter: 0, failCounter: 0, goodCounter: 0, sumCounter: 0};

        arrData.forEach(({data}) => {
            resSum.sumCounter += data?.[0]?.sumCounter ?? data?.result?.[0]?.sumCounter ?? 0;
            resSum.goodCounter += data?.[0]?.goodCounter ?? data?.result?.[0]?.goodCounter ?? 0;
            resSum.badCounter += data?.[0]?.badCounter ?? data?.result?.[0]?.badCounter ?? 0;
            resSum.failCounter += data?.[0]?.failCounter ?? data?.result?.[0]?.failCounter ?? 0;
        });

        set((s: StoreArchive) => {
            s.listQuality[id] = resSum;
        });
    },
    setListFilter: (id, data) => set((s: StoreArchive) => {
        s.listFilter[id] = data;
    }),

    getListFilter: async (id: number): Promise<ListFilters> => {
        const s = get() as ArchiveTableSlice;
        const arrParam = [id, formatDateTime(s.dateRange.from, 'yyyy-mm-dd'), formatDateTime(s.dateRange.to, 'yyyy-mm-dd')];
        // const arrParam = [id, '2025-08-01', '2025-08-05'];

        const hash = getHashCyrb53Arr(arrParam);
        if (listHashReqFilter.has(hash)) return;
        listHashReqFilter.add(hash);


        // @ts-ignore
        const {data: {id: respID, filterNames}} = await apiInstance.apiDataGetFiltersGet(...arrParam);

        set((s: StoreArchive) => {
            s.listFilter[respID] = [...filterNames];
        });

        return {id: respID, filterNames};
    }

});

const listCursorReqTableData = new Set();
const listHashReqQuality = new Set();
const listHashReqFilter = new Set();