"use client";
import React, { useState } from "react";
import Pagination from "@/app/components/pagination/pagination";
import Accordion from "@/app/components/accordion/accordion";

const NewsListClient = ({ initialPage, totalPages, news }) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.location.href = `/articles/list?page=${page}`;
    };

    const items = news.map((item) => ({
        ...item, // 使用展開運算符保留所有屬性
        title: item.Title,
        content: (
            <>
                <p>{item.Content}</p>
            </>
        ),
    }));

    return (
        <div>
            <Accordion items={items} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default NewsListClient;
