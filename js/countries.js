import { fetchCountries, fetchHolidays } from "./api.js";

// DOM Variables
const listOfCountries = document.getElementById("countriesList");
const listOfYears = document.getElementById("yearsList");
const holidaysHistoryTable = document.querySelector(".holiday-history_table");
const historyTableBody = document.querySelector(".holiday-history_table-body");
const sortDate = document.querySelector(".holiday-history_date-sort");

// Constants
const INITIAL_START_YEAR = 2001;
const INITIAL_END_YEAR = 2050;

// Variables
let isHolidayTabPrepared = false;
let isSortingDown = false;

// Functions
async function createListOfCountries() {
    try {
        const data = await fetchCountries();  
        data.forEach((country) => {
            let option = document.createElement("option");
            option.textContent = country.country_name;
            option.value = country["iso-3166"];
            listOfCountries.add(option);
        });
        listOfYears.disabled = true;
    } catch(error) {
        alert("Error! Something wrong with the request");
    }
}

function createListOfYear() {
    const currentYear = (new Date).getFullYear();
        for (let year = INITIAL_START_YEAR; year < INITIAL_END_YEAR; year ++) {
            let yearOption = document.createElement("option");
            yearOption.textContent = year;
            yearOption.value = year;
            yearsList.append(yearOption);
        }
        yearsList.value = currentYear;
}   

const alert = function (message, timeout = 3000) {
    const alertMessage = document.createElement("div");
    alertMessage.classList.add("alert");
    alertMessage.textContent = message;
    document.body.append(alertMessage);

    setTimeout(hideAlert, timeout);
}
const hideAlert = function() {
    const div = document.querySelector(".alert");
    div.remove();
}

function sortHolidays(property, direction) {
    return (a, b) => direction ? (a[property] > b[property] ? 1 : -1) : (a[property] < b[property] ? 1 : -1);
}

async function renderHolidaysTable() {
    try {
        const selectedCountry = listOfCountries.value; 
        const selectedYear = listOfYears.value;
        if (!selectedCountry || !selectedYear) {
            return;
        }
        let holidays = await fetchHolidays(selectedCountry, selectedYear);
        while (historyTableBody.firstElementChild) {
            historyTableBody.firstElementChild.remove();
        }
        
        holidays = holidays.map((holiday) => ({
            name: holiday.name,
            iso: holiday.date.iso.slice(0, 10),
        }));

        holidays.sort(sortHolidays("iso", isSortingDown));
        holidays.forEach((holiday) => {
            const newRow = document.createElement("tr");
            historyTableBody.append(newRow);
        
            let cell = document.createElement("td");
            newRow.append(cell);
            cell.innerText = holiday.iso;
        
            cell = document.createElement("td");
            newRow.append(cell);
            cell.innerText = holiday.name;
        });
        holidaysHistoryTable.classList.remove("disabled"); 
    } catch(error) {
        holidaysHistoryTable.classList.add("disabled");
        alert("Error! Something wrong with the request");
    };
}

function toggleSorting() {
    if (!sortDate) return; 
    isSortingDown = !isSortingDown;
    sortDate.classList.toggle("sorting-down", isSortingDown);

    renderHolidaysTable();
}

function enableYearList() {
    listOfYears.disabled = false;
}

export function initHolidayTab() {
    if (isHolidayTabPrepared) {
        return;
    }; 
    isHolidayTabPrepared = true;
    
    createListOfYear();
    createListOfCountries();
    renderHolidaysTable();
    toggleSorting();
}

// Event Listeners
listOfCountries.addEventListener("change", function() {
    renderHolidaysTable();
    enableYearList();
});
listOfYears.addEventListener("change", renderHolidaysTable);
if (sortDate) {
    sortDate.addEventListener("click", toggleSorting);
} else {
    console.log("Date sort element not found!");
}