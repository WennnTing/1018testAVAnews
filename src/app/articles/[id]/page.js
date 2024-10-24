"use server";
import React from "react";
import style from './newsDetail.module.scss';
import Image from "next/image";

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

    const defaultImage = "https://master.d31i5oomezebae.amplifyapp.com/coin.jpg";
    const imageUrl = article.ImageUrl && article.ImageUrl.trim()
        ? article.ImageUrl
        : defaultImage;
    const description = article.Content ? article.Content.slice(0, 100) : "No description available";

    return {
        title: article.Title,
        description: description,
        openGraph: {
            title: article.Title,
            description: description,
            images: [imageUrl],
            url: `https://master.d31i5oomezebae.amplifyapp.com/articles/${id}`,
        },
        twitter: {
            card: "summary_large_image",
            title: article.Title,
            description: description,
            images: [imageUrl],
        },
    };
}


export async function generateImageMetadata({ params }) {
    const { id } = params;
    const article = await fetchArticle(id);
    const defaultImage = "https://master.d31i5oomezebae.amplifyapp.com/coin.jpg";
    const imageUrl = article?.ImageUrl || defaultImage;

    return {
        url: imageUrl,
        alt: article?.Title || "Default Image",
        width: 1200,
        height: 630,
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
        <div className={style.newsDetail}>
            <h1 className={style.newsDetail__title}>{article.Title}</h1>
            {article.ImageUrl &&
                <Image
                    src={article.ImageUrl}
                    width={400}
                    height={400}
                    alt={article.Title || "Default Image"}
                    className={style.accordion__image}
                />
            }
            <p className={style.newsDetail__content}>{article.Content}</p>

            <div>
                <p className={style.newsDetail__comment}>
                    {article.Comment}
                </p>
            </div>

            <div>
                <h3 className={style.newsDetail__subTitle}>
                    Comment Reason:
                </h3>
                <p className={style.newsDetail__commentReason}>
                    {article.CommentReason}
                </p>
            </div>
            <div>
                <h3 className={style.newsDetail__subTitle}>
                    Created At:
                </h3>
                <p className={style.newsDetail__createTime}>
                    {article.CreateTime}
                </p>
            </div>
        </div >
    );
}
