import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GeneralTiles, { GeneralTileItem } from './GeneralTiles';
import { INDICATORS_MODE } from '@/components/MKD/stores/slices/centralChartsSlice';

jest.mock('../../../components/Icons.tsx', () => ({
    IconArrowDownBadge12: () => <span data-testid='tiles-arrow' />,
    IconRightArrow: () => <span data-testid='tiles-right' />,
}));

const makeItems = (n: number): GeneralTileItem[] =>
    Array.from({ length: n }).map((_, i) => ({ name: `Item ${i}`, percent: i, count: i * 10, color: '#000' }));

describe('GeneralTiles', () => {
    it('renders title and items', () => {
        render(
            <GeneralTiles
                title='Заголовок'
                onModeChange={() => {}}
                items={makeItems(5)}
                currentMode={INDICATORS_MODE.Parameters}
            />
        );
        expect(screen.getByText('Заголовок')).toBeInTheDocument();
        expect(screen.getByText('Item 0')).toBeInTheDocument();
    });

    it('opens dropdown and calls onModeChange', () => {
        const onModeChange = jest.fn();
        render(
            <GeneralTiles
                title='Tiles'
                onModeChange={onModeChange}
                items={makeItems(5)}
                currentMode={INDICATORS_MODE.Parameters}
            />
        );
        fireEvent.click(screen.getByTestId('tiles-arrow').closest('button')!);
        fireEvent.click(screen.getByText('Общие показатели по правилам'));
        expect(onModeChange).toHaveBeenCalledWith(INDICATORS_MODE.Rules);
    });

    it('highlights currentMode item in dropdown', () => {
        render(
            <GeneralTiles
                title='Tiles'
                onModeChange={() => {}}
                items={makeItems(5)}
                currentMode={INDICATORS_MODE.Rules}
            />
        );
        fireEvent.click(screen.getByTestId('tiles-arrow').closest('button')!);
        const activeBtn = screen.getByRole('button', { name: 'Общие показатели по правилам' });
        expect(activeBtn).toHaveClass('bg-[#F5F7F9]');
    });

    it('does not open dropdown when disabled', () => {
        render(<GeneralTiles title='Tiles' onModeChange={() => {}} items={makeItems(5)} disabled />);
        fireEvent.click(screen.getByTestId('tiles-arrow').closest('button')!);
        expect(screen.queryByText('Общие показатели по правилам')).not.toBeInTheDocument();
    });

    it('shows pagination controls when more than one page', () => {
        // 16 items -> pageSize 15 => 2 pages
        render(<GeneralTiles title='Tiles' onModeChange={() => {}} items={makeItems(16)} />);
        // prev/next buttons exist
        expect(screen.getAllByTestId('tiles-right').length).toBe(2);
        // dots count equals totalPages (2)
        const dots = screen.getAllByRole('button', { name: /go to page/i });
        expect(dots.length).toBe(2);
    });

    it('renders skeletons when loading', () => {
        render(<GeneralTiles title='Tiles' onModeChange={() => {}} items={makeItems(0)} loading />);
        // dropdown should still exist
        expect(screen.getByTestId('tiles-arrow')).toBeInTheDocument();
        // No real item names are rendered
        expect(screen.queryByText(/Item \d+/)).not.toBeInTheDocument();
    });
});
