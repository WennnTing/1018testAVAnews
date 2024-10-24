"use server";
import { NextResponse } from "next/server";
import { setCookie } from "@/app/utils/cookie";
import { login } from "@/app/actions/auth";

export async function POST(request) {
    const { email, password } = await request.json();

    try {
        const data = await login({ email, password });

        setCookie("avaToken_v2", data.AccessToken, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json({ message: "Login successful" });
    } catch (error) {
        console.error("Login failed:", error);
        return NextResponse.json({ message: "Login failed", error: error.message }, { status: 400 });
    }
}
