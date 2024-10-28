"use client"; // 指定客戶端組件

import React from "react";
import { useRouter } from "next/navigation";
import styles from './button.module.scss';

export default function BannerButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/register_v2"); // 客戶端導航
    };

    return (
        <button onClick={handleClick} className={styles.newsDetail__button}>
            Read More
        </button>
    );
}
