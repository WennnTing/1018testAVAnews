"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.append("Account", email);
            params.append("Password", password);

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Login failed");
                return;
            }

            const data = await response.json();
            console.log("Login successful:", data);
            router.push("/articles/list");
        } catch (error) {
            console.error("Request failed:", error);
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Login;
