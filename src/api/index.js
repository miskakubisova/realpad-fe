/**
 * Fetches a list of cities from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of city names.
 */
export async function fetchCities() {
    try {
        const response = await fetch('cities');
        if (!response.ok) {
            throw new Error('Failed to fetch cities');
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch cities:", error);
        throw error;
    }
}

/**
 * Fetches forecast data for a specified city.
 * @param {String} cityName The name of the city to fetch forecast data for.
 * @returns {Promise<Object>} A promise that resolves to the forecast data.
 */
export async function fetchForecastData(cityName) {
    if (!cityName) return;

    try {
        const response = await fetch(`forecast/${cityName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch forecast data for ${cityName}`);
        }
        const data = await response.json();
        return {
            temperatureData: {
                labels: data.responseItems.map(item => formatDateString(item.date)),
                datasets: [
                    {
                        label: 'Temperature',
                        backgroundColor: 'rgba(114,54,235,0.2)',
                        borderColor: 'rgb(135,54,235)',
                        data: data.responseItems.map(item => item.temperature),
                        fill: false,
                    },
                    {
                        label: 'Feels Like Temperature',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        data: data.responseItems.map(item => item.feelsLikeTemperature),
                        fill: false,
                    },
                ],
            },
            environmentData: {
                labels: data.responseItems.map(item => formatDateString(item.date)),
                datasets: [
                    {
                        label: 'Pressure',
                        backgroundColor: 'rgba(255,99,159,0.2)',
                        borderColor: 'rgb(255,99,177)',
                        data: data.responseItems.map(item => item.pressure),
                        fill: false,
                    },
                    {
                        label: 'Humidity',
                        backgroundColor: 'rgba(235,54,54,0.2)',
                        borderColor: 'rgb(235,54,54)',
                        data: data.responseItems.map(item => item.humidity),
                        fill: false,
                    },
                ],
            },
        };
    } catch (error) {
        console.error(`Failed to fetch data for ${cityName}:`, error);
        throw error;
    }
}

// Helper function to format date strings
function formatDateString(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
