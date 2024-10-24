"use server";

import { cookies } from "next/headers";

export async function setCookie(key, value, options = {}) {
    const cookieStore = cookies();
    cookieStore.set(key, value, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        ...options,
    })
}