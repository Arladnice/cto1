import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import InfiniteRows from "./InfiniteRows";

beforeAll(() => {
    window.scrollTo = jest.fn();
});

describe("InfiniteRows component", () => {
    const renderRow = (cell: string | undefined, index: number) =>
        cell ? <div data-testid={`row-${index}`}>{cell}</div> : null;

    it("renders visible rows correctly", () => {
        const arrRow = Array.from({ length: 20 }, (_, i) => `Row ${i}`);
        render(<InfiniteRows arrRow={arrRow} renderRow={renderRow} />);

        expect(screen.getByTestId("row-0")).toBeInTheDocument();
        expect(screen.getByTestId("row-5")).toBeInTheDocument();
    });

    it("skips rows that return null", () => {
        const arrRow = ["A", undefined, "B"];
        render(<InfiniteRows arrRow={arrRow} renderRow={renderRow} />);

        expect(screen.queryByTestId("row-1")).not.toBeInTheDocument();
    });

    it("calls clbLoadMore when near the end", async () => {
        const mockLoadMore = jest.fn();
        const arrRow = Array.from({ length: 5 }, (_, i) => `Item ${i}`);

        render(
            <InfiniteRows
                arrRow={arrRow}
                renderRow={renderRow}
                loadThreshold={2}
                clbLoadMore={mockLoadMore}
            />
        );

        act(() => {
            window.dispatchEvent(new Event("scroll"));
        });

        await waitFor(() => expect(mockLoadMore).toHaveBeenCalled());
    });

    it("calls onIndexChange when scroll changes", () => {
        const mockIndexChange = jest.fn();
        const arrRow = Array.from({ length: 15 }, (_, i) => `Row ${i}`);

        render(
            <InfiniteRows
                arrRow={arrRow}
                renderRow={renderRow}
                onIndexChange={mockIndexChange}
            />
        );

        act(() => {
            window.scrollTo(0, 100);
            window.dispatchEvent(new Event("scroll"));
        });

        expect(mockIndexChange).toHaveBeenCalled();
    });

    it("calls onEndData when clbLoadMore returns false", async () => {
        const onEndData = jest.fn();
        const clbLoadMore = jest.fn().mockReturnValue(false);

        render(
            <InfiniteRows
                arrRow={Array.from({ length: 5 }, (_, i) => `Row ${i}`)}
                renderRow={renderRow}
                clbLoadMore={clbLoadMore}
                onEndData={onEndData}
                loadThreshold={10}
            />
        );

        act(() => {
            window.dispatchEvent(new Event("scroll"));
        });

        await waitFor(() => expect(onEndData).toHaveBeenCalled());
    });

    it("renders placeholder height when rowHeights are undefined", () => {
        const arrRow = Array.from({ length: 10 }, (_, i) => `Row ${i}`);
        const { container } = render(<InfiniteRows arrRow={arrRow} renderRow={renderRow} />);

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper.style.height).toMatch(/^\d+px$/);
    });
});
