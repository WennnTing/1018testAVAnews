"use server";
import React from "react";
import { getCookies } from "@/app/actions/auth";
import NewsListClient from "./NewsListClient";

async function fetchNews(page) {
    const token = await getCookies();

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}api/DataCenter/GetBlockchainNewsData?page=${page}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Response not ok:", response.status, response.statusText, errorText);
            throw new Error(`Failed to fetch news, status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        return {
            news: data.BlockChainNews || [],
            totalCount: data.TotalCount || 0,
        };
    } catch (error) {
        console.error("Error fetching news:", error);
        return {
            news: [],
            totalCount: 0,
        };
    }
}

export default async function NewsList({ searchParams }) {
    const pageNumber = parseInt(searchParams.page || "1", 10);
    const pageSize = 10;
    const { news, totalCount } = await fetchNews(pageNumber);
    const totalPages = Math.ceil(totalCount / pageSize);

    if (!news.length) {
        return (
            <div>
                <h1>News Not Found</h1>
            </div>
        );
    }

    return (
        <div style={{ padding: "60px" }}>
            <h1 style={{ color: "white", padding: "20px" }}>AVA News Blog</h1>
            <NewsListClient initialPage={pageNumber} totalPages={totalPages} news={news} />
        </div>
    );
}
