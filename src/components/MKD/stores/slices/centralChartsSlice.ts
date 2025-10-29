import { ChartsApi, Configuration, DonutCharts, FieldStatDto, GroupApi, QualityCounter } from '@/api/generated';

const configuration = new Configuration({ basePath: ' ' });
const chartsApi = new ChartsApi(configuration);
const groupApi = new GroupApi(configuration);

export enum INDICATORS_MODE {
    Parameters = 0,
    Rules = 1,
}

export interface CentralChartsSlice {
    date: string | null;
    dateTo: string | null;
    tableGroup: 0 | 1;
    inFlightKey: string | null;
    isLoadingCharts: boolean; // overall (derived)
    isLoadingGeneral: boolean;
    isLoadingQuality: boolean;
    isLoadingMonths: boolean;
    monthsSeries: { good: number; bad: number; date: string }[];
    isLoadingTiles: boolean;
    isLoadingTable: boolean;
    generalCounter: DonutCharts | null;
    qualityCounter: QualityCounter | null;
    tiles: Array<{ name: string; good: number; percentage: number }>; // GroupBy response
    fieldStats: Array<FieldStatDto>;
    setDateString: (date: string) => void;
    setDateToString: (dateTo: string | null) => void;
    setTableGroup: (group: 0 | 1) => void;
    loadChartsCounters: () => void;
    loadGroupByTiles: (groupBy: INDICATORS_MODE) => Promise<void>;
    loadGroupByField: () => Promise<void>;
}

export const createCentralChartsSlice = (set: any, get: any): CentralChartsSlice => ({
    date: null,
    dateTo: null,
    tableGroup: 0,
    inFlightKey: null,
    isLoadingCharts: false,
    isLoadingGeneral: false,
    isLoadingQuality: false,
    isLoadingMonths: false,
    generalCounter: null,
    qualityCounter: null,
    monthsSeries: [],
    isLoadingTiles: false,
    isLoadingTable: false,
    tiles: [],
    fieldStats: [],

    setDateString: (date: string) => {
        set((state: CentralChartsSlice) => {
            state.date = date;
        });
    },

    setDateToString: (dateTo: string | null) => {
        set((state: CentralChartsSlice) => {
            state.dateTo = dateTo ?? null;
        });
    },

    setTableGroup: (group: 0 | 1) => {
        set((state: CentralChartsSlice) => {
            state.tableGroup = group;
        });
    },

    loadChartsCounters: () => {
        const { date, dateTo, isLoadingGeneral, isLoadingQuality, isLoadingMonths } = get() as CentralChartsSlice;
        if (isLoadingGeneral || isLoadingQuality || isLoadingMonths) return;
        if (!date) return;

        const key = dateTo ? `${date}_${dateTo}` : `${date}`;
        const { inFlightKey, isLoadingCharts } = get() as CentralChartsSlice;
        if (inFlightKey === key && isLoadingCharts) {
            return;
        }

        // set per-endpoint loading
        set((state: CentralChartsSlice) => {
            state.inFlightKey = key;
            state.isLoadingGeneral = true;
            state.isLoadingQuality = true;
            state.isLoadingMonths = true;
            state.isLoadingCharts = true;
        });

        // Fire requests in parallel and clear flags independently
        (async () => {
            try {
                const { data } = dateTo
                    ? await chartsApi.apiChartsGetGeneralCounterGet(date, dateTo)
                    : await chartsApi.apiChartsGetGeneralCounterGet(date);
                set((state: CentralChartsSlice) => {
                    state.generalCounter = data;
                    state.isLoadingGeneral = false;
                    state.isLoadingCharts = state.isLoadingQuality || state.isLoadingGeneral;
                    if (!state.isLoadingCharts) state.inFlightKey = null;
                });
            } catch (e) {
                set((state: CentralChartsSlice) => {
                    state.isLoadingGeneral = false;
                    state.isLoadingCharts = state.isLoadingQuality || state.isLoadingGeneral;
                    if (!state.isLoadingCharts) state.inFlightKey = null;
                });
            }
        })();

        (async () => {
            try {
                const { data } = dateTo
                    ? await chartsApi.apiChartsGetQualityCounterGet(date, dateTo)
                    : await chartsApi.apiChartsGetQualityCounterGet(date);
                set((state: CentralChartsSlice) => {
                    state.qualityCounter = data;
                    state.isLoadingQuality = false;
                    state.isLoadingCharts = state.isLoadingQuality || state.isLoadingGeneral;
                    if (!state.isLoadingCharts) state.inFlightKey = null;
                });
            } catch (e) {
                set((state: CentralChartsSlice) => {
                    state.isLoadingQuality = false;
                    state.isLoadingCharts = state.isLoadingQuality || state.isLoadingGeneral;
                    if (!state.isLoadingCharts) state.inFlightKey = null;
                });
            }
        })();

        (async () => {
            try {
                // Backend now accepts a single date; client signature might not include it yet.
                // Call without date if client not regenerated.
                const res = await chartsApi.apiChartsGetChartsByMonthsGet();
                const { data } = res as unknown as { data: { good: number; bad: number; date: string }[] };
                set((state: CentralChartsSlice) => {
                    state.monthsSeries = Array.isArray(data) ? data : [];
                    state.isLoadingMonths = false;
                    state.isLoadingCharts = state.isLoadingQuality || state.isLoadingGeneral || state.isLoadingMonths;
                    if (!state.isLoadingCharts) state.inFlightKey = null;
                });
            } catch (e) {
                set((state: CentralChartsSlice) => {
                    state.isLoadingMonths = false;
                    state.isLoadingCharts = state.isLoadingQuality || state.isLoadingGeneral || state.isLoadingMonths;
                    if (!state.isLoadingCharts) state.inFlightKey = null;
                });
            }
        })();
    },

    loadGroupByTiles: async (groupBy: INDICATORS_MODE) => {
        const { date, dateTo, isLoadingTiles } = get() as CentralChartsSlice;
        if (!date) return;
        if (isLoadingTiles) return;
        set((state: CentralChartsSlice) => {
            state.isLoadingTiles = true;
        });
        try {
            const { data } = dateTo
                ? await groupApi.apiDataGeneralGroupGet(date, dateTo, groupBy)
                : await groupApi.apiDataGeneralGroupGet(date, undefined, groupBy);
            set((state: CentralChartsSlice) => {
                state.tiles = data.map((item) => ({
                    name: item.name,
                    good: item.good,
                    percentage: item.percentage,
                }));
                state.isLoadingTiles = false;
            });
        } catch (e) {
            set((state: CentralChartsSlice) => {
                state.isLoadingTiles = false;
            });
        }
    },

    loadGroupByField: async () => {
        const { date, dateTo, tableGroup, isLoadingTable } = get() as CentralChartsSlice;
        if (!date) return;
        if (isLoadingTable) return;
        set((state: CentralChartsSlice) => {
            state.isLoadingTable = true;
        });
        try {
            const { data } = dateTo
                ? await groupApi.apiDataTableGroupGet(date, dateTo, tableGroup)
                : await groupApi.apiDataTableGroupGet(date, undefined, tableGroup);
            set((state: CentralChartsSlice) => {
                state.fieldStats = Array.isArray(data) ? data : [];
                state.isLoadingTable = false;
            });
        } catch (e) {
            set((state: CentralChartsSlice) => {
                state.isLoadingTable = false;
            });
        }
    },
});
