async function testApi() {
    try {
        const params = new URLSearchParams();
        params.append("Account", "bbbbbbb8910@gmail.com");
        params.append("Password", "IN53TER69SEN67SE46");

        const response = await fetch("https://apiavairobot.com:9024/api/auth/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        const text = await response.text();
        console.log("Response status:", response.status);
        console.log("Response text:", text);

        if (response.headers.get("Content-Type")?.includes("application/json")) {
            const result = JSON.parse(text);
            console.log("Parsed result:", result);
        } else {
            console.log("Response is not JSON, raw text output shown above.");
        }
    } catch (error) {
        console.error("API request failed:", error);
    }
}

testApi();
