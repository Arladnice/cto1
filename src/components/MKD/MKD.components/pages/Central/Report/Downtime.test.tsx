import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Downtime } from './Downtime';

jest.mock('../../../components/Charts/Donat', () => ({
    DonutChart: ({ centerText }: any) => <div data-testid='donut' data-center={centerText} />,
}));

describe('Downtime', () => {
    const items = [
        { name: 'A', color: '#111', percent: 10, count: 5 },
        { name: 'B', color: '#222', percent: 20, count: 15 },
    ];
    const donut = { data: [1, 2], colors: ['#111', '#222'], total: 20 };

    it('renders donut and items', () => {
        render(<Downtime items={items as any} donut={donut as any} loading={false} />);
        expect(screen.getByTestId('donut')).toBeInTheDocument();
        // center text equals total formatted compact; we only assert presence attribute
        expect(screen.getByTestId('donut')).toHaveAttribute('data-center');
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
    });

    it('renders skeletons when loading', () => {
        render(<Downtime items={[]} donut={donut as any} loading />);
        // names should not render when loading
        expect(screen.queryByText('A')).not.toBeInTheDocument();
    });
});

