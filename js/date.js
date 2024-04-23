import { results, addRecordToStorage } from "./storage.js";
import { renderTable } from "./timeTableRenderer.js";

// DOM Variables
const dateSelectionForm = document.getElementById("dateSelectionForm");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const weekPresetButton = document.getElementById("weekPresetButton");
const monthPresetButton = document.getElementById("monthPresetButton");
const daysOptionInput = document.getElementById("daysOption");
const unitOptionInput = document.getElementById("unitOption");
const currentResult = document.getElementById("currentResult");

// Constants for time durations
const DAY = 1;
const HOURS_IN_DAY = 24;
const MINUTES_IN_DAY = 1440;
const SECONDS_IN_DAY = 86400;
const MILLISECONDS_IN_DAY = 86400000;

// Function to calculate duration between times
const getDurationBetweenTimes = (startDate, endDate, quantity, daysOption) => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    let periodDuration;
    switch (quantity) {
        case "days":
            periodDuration = DAY;
            break;
        case "hours":
            periodDuration = HOURS_IN_DAY;
            break;
        case "minutes":
            periodDuration = MINUTES_IN_DAY;
            break;
        case "seconds":
            periodDuration = SECONDS_IN_DAY;
            break;
        default:
            return "Please select quantity from the drop down list.";
    }

    let differenceInDays = 0;
    switch (daysOption) {
        case "all":
            differenceInDays = getAllDays(startDateTime, endDateTime);
            break;
        case "weekdays":
            differenceInDays = getWorkingDays(startDateTime, endDateTime);
            break;
        case "weekends":
            differenceInDays = getWeekendDays(startDateTime, endDateTime);  
            break;
        default:
            return "Please select day option from the drop down list.";
    }
    
    const period = differenceInDays * periodDuration;
    const unit = period === 1 ? "day" : quantity;

    return `${period} ${unit}`;
}

// Function to get all days between two dates
const getAllDays = (startDate, endDate) => (endDate - startDate) / MILLISECONDS_IN_DAY;

// Function to get working days between two dates
const getWorkingDays = (startDate, endDate) => {
    let differenceInDays = 0;
    for (let currentDay = new Date(startDate); currentDay < endDate; addDay(currentDay)) {
        if (isWorkingDay(currentDay)) {
            differenceInDays++;
        }
    }
    return differenceInDays;
};

// Function to get weekend days between two dates
const getWeekendDays = (startDate, endDate) => getAllDays(startDate, endDate) - getWorkingDays(startDate, endDate);

// Function to check if a day is a working day
const isWorkingDay = currentDay => currentDay.getDay() !== 6 && currentDay.getDay() !== 0;

// Function to add one day to a date
const addDay = currentDay => currentDay.setDate(currentDay.getDate() + 1);

// Function to add one week to a date
const addWeek = dateValue => dateValue.setDate(dateValue.getDate() + 7);

// Function to add one month to a date
const addMonth = dateValue => dateValue.setMonth(dateValue.getMonth() + 1);

// Function to initialize the calculating tab
export const initCalculatingTab = () => {
    const enableEndDateInput = () => {
        endDateInput.disabled = startDateInput.value === "";
        endDateInput.min = startDateInput.value;
    };

    const chooseDatePeriod = (event) => {
        const dateValue = new Date(startDateInput.value);
        if (event.target === weekPresetButton) {
            addWeek(dateValue);
        }
        if (event.target === monthPresetButton) {
            addMonth(dateValue);
        }
        endDateInput.valueAsDate = dateValue;
    };

    const calculateTime = (event) => {
        event.preventDefault();
        const startDateValue = startDateInput.value;
        const endDateValue = endDateInput.value;
        const unitOptionValue = unitOptionInput.value;
        const daysOptionValue = daysOptionInput.value;

        const result = getDurationBetweenTimes(startDateValue, endDateValue, unitOptionValue, daysOptionValue);
        currentResult.innerText = result;

        const record = { startDate: startDateValue, endDate: endDateValue, result };
        addRecordToStorage(record);
        renderTable();
    };

    // Event listeners
    weekPresetButton.addEventListener("click", chooseDatePeriod);
    monthPresetButton.addEventListener("click", chooseDatePeriod);
    startDateInput.addEventListener("change", enableEndDateInput);
    endDateInput.addEventListener("change", () => {
        const endDate = new Date(endDateInput.value);
        startDateInput.max = endDate.toISOString().split('T')[0];
    });
    dateSelectionForm.addEventListener("submit", calculateTime);

    // Initialize form
    enableEndDateInput();
    if (results.length !== 0) {
        renderTable();
    }
}