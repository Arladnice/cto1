import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createHeaderSlice, HeaderSlice } from '@/components/MKD/stores/slices/headerSlice.ts';
import { createGroupsSlice, GroupsSlice } from '@/components/MKD/stores/slices/groupsSlice.ts';
import { createTableSlice, TableSlice } from '@/components/MKD/stores/slices/tableSlice.ts';
import { createArchiveTableSlice, ArchiveTableSlice } from '@/components/MKD/stores/slices/archiveTableSlice.ts';
import { createFilterSortSlice, FilterSortSlice } from '@/components/MKD/stores/slices/filterSortSlice.ts';
import { createFilterCardCreateSlice, FilterCardCreateSlice } from '@/components/MKD/stores/slices/filterCard.ts';
import { CentralChartsSlice, createCentralChartsSlice } from '@/components/MKD/stores/slices/centralChartsSlice.ts';

export type StoreArchive = HeaderSlice & ArchiveTableSlice & GroupsSlice & FilterSortSlice;
export const useStoreArchive = create<StoreArchive>()(
    persist(
        immer((set, get) => ({
            ...createHeaderSlice(set, get),
            ...createArchiveTableSlice(set, get),
            ...createGroupsSlice(set, get),
            ...createFilterSortSlice(set, get),
        })),
        {
            name: 'archive',
            partialize: (state) => ({
                arrSort: state.arrSort,
                arrFilter: state.arrFilter,
                arrIncludedColumn: state.arrIncludedColumn,
            }),
            version: 0,
        }
    )
);

export type StoreSettings = HeaderSlice & TableSlice & GroupsSlice & FilterSortSlice;
export const useStoreSettingFilters = create<StoreSettings>()(
    persist(
        immer((set, get) => ({
            ...createHeaderSlice(set, get),
            ...createTableSlice(set, get),
            ...createGroupsSlice(set, get),
            ...createFilterSortSlice(set, get),
        })),
        { name: 'setting-filters', version: 0 }
    )
);

export type StoreFilterCard = HeaderSlice & TableSlice & GroupsSlice & FilterSortSlice & FilterCardCreateSlice;
export const useStoreFilterCardCreate = create<StoreFilterCard>()(
    persist(
        immer((set, get) => ({
            ...createHeaderSlice(set, get),
            ...createTableSlice(set, get),
            ...createGroupsSlice(set, get),
            ...createFilterSortSlice(set, get),
            ...createFilterCardCreateSlice(set, get),
        })),
        { name: 'filter-card', version: 0 }
    )
);

export type StoreFilterStoryChange = HeaderSlice & TableSlice & GroupsSlice & FilterSortSlice;
export const useStoreFilterStoryChange = create<StoreFilterStoryChange>()(
    persist(
        immer((set, get) => ({
            ...createHeaderSlice(set, get),
            ...createTableSlice(set, get),
            ...createGroupsSlice(set, get),
            ...createFilterSortSlice(set, get),
            ...createFilterCardCreateSlice(set, get),
        })),
        { name: 'story-change', version: 0 }
    )
);

export type StoreCentralTable = HeaderSlice & TableSlice & GroupsSlice & FilterSortSlice & CentralChartsSlice;
export const useStoreCentralTable = create<StoreCentralTable>()(
    // persist(
    immer((set, get) => ({
        ...createHeaderSlice(set, get),
        ...createTableSlice(set, get),
        ...createGroupsSlice(set, get),
        ...createFilterSortSlice(set, get),
        ...createFilterCardCreateSlice(set, get),
        ...createCentralChartsSlice(set, get),
    }))
    // {name: 'new-filter', version: 0}
    // )
);
