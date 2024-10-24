"use server";
import React from "react";
import Head from "next/head";

async function fetchArticle(id) {
    const token = "your_fixed_token_value";

    try {
        console.log(`Fetching article with ID: ${id}`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/DataCenter/GetBlockchainNewsDataById?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            console.error("Response not ok:", response.status);
            throw new Error(`Failed to fetch article, status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        return data.BlockChainNews || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export default async function ArticlePage({ params }) {
    console.log("Params received in ArticlePage:", params);
    const { id } = params;

    const article = await fetchArticle(id);

    if (!article) {
        return (
            <div>
                <h1>Article Not Found</h1>
                <p>The article with ID {id} could not be found or failed to load.</p>
            </div>
        );
    }

    return (
        <div>
            <Head>
                <title>{article.Title}</title>
                <meta property="og:title" content={article.Title} />
                <meta property="og:description" content={article.Content.slice(0, 100)} />
                <meta property="og:image" content={article.ImageUrl} />
                <meta property="og:url" content={`http://localhost:3000/articles/${id}`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.Title} />
                <meta name="twitter:description" content={article.Content.slice(0, 100)} />
                <meta name="twitter:image" content={article.ImageUrl} />
            </Head>
            <h1>{article.Title}</h1>
            {article.ImageUrl && <img src={article.ImageUrl} alt={article.Title} />}
            <p>{article.Content}</p>
            <div>
                <h3>Comment:</h3>
                <p>{article.Comment}</p>
            </div>
            <div>
                <h3>Comment Reason:</h3>
                <p>{article.CommentReason}</p>
            </div>
            <div>
                <h3>Created At:</h3>
                <p>{article.CreateTime}</p>
            </div>
        </div>
    );
}
