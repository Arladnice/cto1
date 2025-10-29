import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DowntimeHistogram } from './DowntimeHistogram';

jest.mock('../../../components/Charts/ChartSection.tsx', () => ({
    ChartSection: ({ downtimeSeries, loading }: any) => (
        <div data-testid='chart-section' data-loading={!!loading} data-len={downtimeSeries?.length ?? 0} />
    ),
}));

describe('DowntimeHistogram', () => {
    it('renders ChartSection with provided series', () => {
        const series = [
            { underTwo: 1, underEight: 2, underTwentyFour: 3, underSeven: 4, moreThenSeven: 5, date: '2025-09-01' },
        ];
        render(<DowntimeHistogram downtimeSeries={series as any} loading={false} />);
        const chart = screen.getByTestId('chart-section');
        expect(chart).toBeInTheDocument();
        expect(chart).toHaveAttribute('data-len', '1');
        expect(chart).toHaveAttribute('data-loading', 'false');
    });

    it('passes loading=true', () => {
        render(<DowntimeHistogram downtimeSeries={[]} loading />);
        const chart = screen.getByTestId('chart-section');
        expect(chart).toHaveAttribute('data-loading', 'true');
    });
});

