import { useEffect, useMemo, useRef } from 'react';
import { useStoreCentralTable } from '@/components/MKD/stores/stores.ts';
import { useShallow } from 'zustand/react/shallow';

export type Comparator = (aCell: any, bCell: any) => number;

export function useClientTable(
    arrHeader: string[] | undefined,
    rows: any[][] | undefined,
    comparators?: Record<number, Comparator>
) {
    const originalRef = useRef<any[][]>([]);

    const { arrSort, arrFilter, arrTable, setArrTable, setArrSort, setListGroups, resetSortFilter } =
        useStoreCentralTable(
            useShallow((s) => ({
                arrSort: s.arrSort,
                arrFilter: s.arrFilter,
                arrTable: s.arrTable,
                setArrTable: s.setArrTable,
                setArrSort: s.setArrSort,
                setListGroups: s.setListGroups,
                resetSortFilter: s.resetSortFilter,
            }))
        );

    // keep original rows
    useEffect(() => {
        if (!rows) return;
        originalRef.current = rows;
        setArrTable(rows);
    }, [rows, setArrTable]);

    // reset filters/sort and build listGroups when header/rows change (navigating to another table)
    useEffect(() => {
        if (!arrHeader || !rows) return;
        resetSortFilter();
        const groups: Record<string, string[]> = {};
        arrHeader.forEach((h, idx) => {
            if (idx === 0) return;
            const set = new Set<string>();
            rows.forEach((r) => set.add(String(r?.[idx] ?? '')));
            groups[h] = Array.from(set);
        });
        setListGroups(groups);
    }, [arrHeader, rows, setListGroups, resetSortFilter]);

    // sorting
    useEffect(() => {
        const col = arrSort.findIndex((it: any) => Boolean(it));
        const sort = col === -1 ? 'unsorted' : arrSort[col];
        if (!sort || sort === 'unsorted') {
            setArrTable([...(originalRef.current ?? [])]);
            return;
        }
        const dir = sort === 'asc' ? 1 : -1;
        const cmp = comparators?.[col];
        const local = [...(originalRef.current ?? [])];
        local.sort((a, b) => {
            const res = cmp ? cmp(a[col], b[col]) : defaultComparator(a[col], b[col]);
            if (res === 0) return 0;
            return res > 0 ? dir : -dir;
        });
        setArrTable(local);
    }, [arrSort, comparators, setArrTable]);

    const filteredRows = useMemo(() => {
        const active = arrFilter.map((f, i) => (!!f ? i : -1)).filter((i) => i > -1);
        const base = (arrTable ?? originalRef.current ?? []) as any[];
        if (!active.length) return base;
        return base.filter((row) =>
            active.every((i) => {
                const tokens = (arrFilter[i] ?? '').split(';').filter(Boolean);
                return tokens.includes(String(row?.[i] ?? ''));
            })
        );
    }, [arrFilter, arrTable]);

    const onHeaderSort = (colIndex: number) => {
        const cur = arrSort[colIndex] ?? 'unsorted';
        const next = cur === 'unsorted' ? 'asc' : cur === 'asc' ? 'desc' : 'unsorted';
        setArrSort(colIndex, next);
    };

    return { filteredRows, onHeaderSort, arrSort, arrFilter };
}

function defaultComparator(a: any, b: any): number {
    const ta = typeof a;
    const tb = typeof b;
    if (ta === 'number' && tb === 'number') return a - b;
    return String(a).localeCompare(String(b));
}
