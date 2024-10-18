export async function fetchWithError(url, options, onError) {
    const response = await fetch(url, options);
    if (!response.ok) {
        if (onError) {
            return onError(response);
        }
        switch (response.status) {
            case 401:
                console.error("401 Unauthorized");
                throw new Error("401 Unauthorized");
            case 500:
                console.error("500 Internal Server Error");
                throw new Error("500 Internal Server Error");
            case 405:
                console.error("405 Method Not Allowed");
                throw new Error("405 Method Not Allowed");
            default:
                console.error(`${response.status} Error`);
                throw new Error(`${response.status} Error`);
        }
    }
    return await response.json();
}
