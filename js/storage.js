const STORAGE_KEY = "results";
const STORAGE_LIMIT = 10;

export const results = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; 

export function addRecordToStorage(record) {
    results.push(record);
    results.length > STORAGE_LIMIT && results.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}