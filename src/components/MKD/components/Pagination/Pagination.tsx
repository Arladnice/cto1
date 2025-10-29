import {PaginationHeadless, PaginationProps, usePagination} from "./PaginationHeadless.tsx";
import clsx from "clsx";
import React from "react";

const Pagination = (props: PaginationProps) => {

    const pagination = usePagination(props);

    return (<PaginationHeadless
            pagination={pagination}
            render={(pgn) => (
                <div className={clsx("gap-[2px] flex items-center text-[#73858F]",)}>
                    {/*<button onClick={pgn.firstPage} disabled={pgn.isFirstPage}>&laquo;</button>*/}
                    <button onClick={pgn.prevPage}
                            className="h-[24px] gap-[4px] px-[10px] py-[4px] flex flex-row text-[#D9DEE1] text-[11px]">
                        <div className="self-center justify-items-center p-1 h-[16px] w-[16px]">
                            <svg width="4" height="8" viewBox="0 0 4 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5 7L0.5 4L3.5 1" stroke={pgn.isFirstPage ? "#D9DEE1" : "#73858F"}
                                      strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className={clsx(pgn.isFirstPage ? "text-[#D9DEE1]" : "text-[#73858F]")}>
                            Назад
                        </div>
                    </button>

                    {pgn.pageRange.map((page, index) => (
                        page === '...' ? (
                            <span key={`ellipsis-${index}`} className="w-[24px] h-[24px] text-center">…</span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => pgn.setPage(page)}
                                className={clsx(
                                    'text-[11px] w-[24px] h-[24px] rounded-[6px]',
                                    (pgn.currentPage === page ? 'text-[#73858F] bg-[#F4F7FA]' : 'text-[#B3BDC2]'))}
                            >
                                {page}
                            </button>
                        )
                    ))}

                    <button onClick={pgn.nextPage}
                            className="h-[24px] gap-[4px] px-[10px] py-[4px] flex flex-row text-[#D9DEE1] text-[11px]">
                        <div className={clsx(pgn.isLastPage ? "text-[#D9DEE1]" : "text-[#73858F]")}>
                            Вперед
                        </div>
                        <div className="self-center justify-items-center p-1 h-[16px] w-[16px]">
                            <svg width="4" height="8" viewBox="0 0 4 8" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 1L3.5 4L0.5 7" stroke={pgn.isLastPage ? "#D9DEE1" : "#73858F"}
                                      strokeLinecap="round"/>
                            </svg>
                        </div>
                    </button>
                    {/*<button onClick={pgn.lastPage} disabled={pgn.isLastPage}>&raquo;</button>*/}
                </div>
            )}
        />
    );
};

export default Pagination;