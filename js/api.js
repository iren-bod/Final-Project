// Constant
const API_KEY = "aqscGKSMQ1pSdjH4MdSxWRiLaxpvCG42";
const API_URL = "https://calendarific.com/api/v2";

export async function fetchCountries() {
    const response = await fetch(`${API_URL}/countries?api_key=${API_KEY}`);
    const data = await response.json();
    if (!response.ok) {  
        throw new Error(`Failed to fetch countries!`);
    }
    return data.response.countries;
}

export async function fetchHolidays(country, year) {
    const response = await fetch(
        `${API_URL}/holidays?api_key=${API_KEY}&country=${country}&year=${year}`
    );
    const data = await response.json()
    if (!response.ok) {  
        throw new Error(`Failed to fetch holidays!`);
    }
    return data.response.holidays;
} 