"use server";
import React from "react";

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
        console.error("Error fetching article:", error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { id } = params;
    const article = await fetchArticle(id);

    if (!article) {
        return {
            title: "Article Not Found",
            description: "The requested article could not be found.",
        };
    }

    const defaultImage = "/coin.jpg";
    const imageUrl = article.ImageUrl && article.ImageUrl.trim() ? article.ImageUrl : defaultImage;
    const description = article.Content ? article.Content.slice(0, 100) : "No description available";

    return {
        title: article.Title,
        description: description,
        openGraph: {
            title: article.Title,
            description: description,
            images: [
                imageUrl,
            ],
            url: `https://master.d31i5oomezebae.amplifyapp.com/articles/${id}`,
        },
        twitter: {
            card: "summary_large_image",
            title: article.Title,
            description: description,
            images: [
                imageUrl,
            ],
        },
    };
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
