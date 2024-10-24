"use client";
import React from "react";
import style from './pagination.module.scss';

const Pagination = ({ currentPage, totalPages, onPageChange, pageRange = 3 }) => {
    const getPageNumbers = () => {
        const pages = [];
        const totalVisiblePages = pageRange * 2 + 1;

        if (totalPages <= totalVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - pageRange);
            const endPage = Math.min(totalPages, currentPage + pageRange);

            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                    pages.push("...");
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push("...");
                }
                pages.push(totalPages);
            }
        }

        return pages;
    };


    return (
        <div className={style.pagination}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={style.pagination__back}
            >
                上一頁
            </button>

            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === currentPage || page === "..."}
                    className={typeof page === "number"
                        ? style.pagination__page
                        : style.pagination__ellipsis}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={style.pagination__next}
            >
                下一頁
            </button>
        </div>
    );
};

export default Pagination;
