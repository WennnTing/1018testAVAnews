"use server";
import { fetchWithError } from "../utils/fetchWithError";

// 取得所有新聞 by 頁數
export async function _getAllNews(page = 1) {
    const response = await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/DataCenter/GetBlockchainNewsData?page=${page}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    return response;
};

// 取得單篇文章 by ID
export async function _getBlockchainNewsDataById(id) {
    const response = await fetchWithError(
        `${process.env.NEXT_PUBLIC_API_URL}/DataCenter/GetBlockchainNewsData/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    return response;
};