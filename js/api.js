export async function apiFetchGet(endpoint) {
    const baseUrl = 'https://graving-backend-production.up.railway.app/api';
    const url = baseUrl + endpoint;
    // const token = ''
    try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la llamada API:', error);
        throw error;
    }
}