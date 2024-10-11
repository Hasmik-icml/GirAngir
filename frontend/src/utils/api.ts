export async function fetchWithAuth(url: string, options: RequestInit) {
    const token = localStorage.getItem('accessToken');

    options.credentials = 'include'; 

    if (token) {
        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    let response = await fetch(url, options);

    if (response.status === 401) {
        const refreshResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            const newAccessToken = data.accessToken;

            localStorage.setItem("accessToken", newAccessToken);

            options.headers = {
                ...options.headers,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${newAccessToken}`,
            };

            response = await fetch(url, options);
        } else {
            return response;
        }
    }

    return response;
}