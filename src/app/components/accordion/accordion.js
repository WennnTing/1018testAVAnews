"use client";
import React, { useState } from "react";
import style from "./accordion.module.scss";
import { RiAddLargeLine } from "react-icons/ri";
import { FaLink } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleCopy = (item) => {
        const currentDomain = window.location.origin;
        const articleUrl = `${currentDomain}/articles/${item.ArticleID}`;
        const textToCopy = `今日快訊：\n${item.Title}\n\n分析評級：\n${item.Comment} \n⋯\n\n查看全文請點擊下方連結\n${articleUrl}`;

        try {
            navigator.clipboard.writeText(textToCopy);
            toast.success("複製成功!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.error("複製失敗：", error);
            toast.error("複製失敗，請手動複製。", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className={style.accordion}>
            {items.map((item, index) => (
                <div key={item.ArticleID} className={style.accordion__item}>
                    <div className={style.accordion__headerWrapper}>
                        <div
                            className={`
                                ${style.accordion__header} 
                                ${activeIndex === index ? style.active : ""}
                            `}
                        >
                            {item.title}
                        </div>

                        <div className={style.accordion__iconWrapper}>
                            <span
                                className={style.accordion__symbol}
                                onClick={() => handleCopy(item)} // 傳遞整個 item，以便構建完整的文字
                            >
                                <FaLink />
                            </span>
                            <span
                                className={`
                                    ${style.accordion__symbol} 
                                    ${activeIndex === index ? style.rotated : ""}
                                `}
                                onClick={() => handleToggle(index)}
                            >
                                <RiAddLargeLine className={style.icon} />
                            </span>
                        </div>
                    </div>
                    {activeIndex === index && (
                        <div className={style.accordion__content}>
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
            <ToastContainer
                className={style.customToastContainer}
                toastClassName={style.customToast}
                bodyClassName={style.customToastBody}
                progressClassName={style.customToastProgress}
            />
        </div>
    );
};

export default Accordion;
