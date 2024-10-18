"use server";
import { cookies } from "next/headers";
import { fetchWithError } from "../utils/fetchWithError";

export async function getCookies() {
    const cookieStore = cookies();
    const token = cookieStore.get("avaToken_v2")?.value;
    return token;
};

export async function login(data) {
    const params = new URLSearchParams();
    params.append("Account", data.email);
    params.append("Password", data.password);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("API responded with an error:", errorText);
            throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();
        console.log("Login successful, response data:", result);
        return result;
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
}

