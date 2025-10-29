import { Downtime } from './Downtime';
import { DowntimeHistogram } from './DowntimeHistogram';
import {
    getDowntimeSeriesMock,
    getDowntimeTilesData,
    getDowntimeDonutMock,
} from '@/components/MKD/mock/mockCentral.ts';
import { useMemo } from 'react';
import { ReportTable } from './ReportTable';

export const Report = () => {
    const downtimeSeries = useMemo(() => getDowntimeSeriesMock(6), []);
    const tiles = useMemo(() => getDowntimeTilesData(), []);
    const donut = useMemo(() => getDowntimeDonutMock(), []);

    return (
        <>
            <div
                className={`mx-[20px] flex rounded-[10px] border border-[#E5E9EB] bg-white p-[20px] shadow-[0px_2px_5px_0px_#00203333]`}
            >
                <Downtime items={tiles.items} donut={donut} loading={false} />
                <DowntimeHistogram downtimeSeries={downtimeSeries} loading={false} />
            </div>
            <ReportTable />
        </>
    );
};
