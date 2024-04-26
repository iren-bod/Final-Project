import { results, addRecordToStorage } from "./storage.js";
import { renderTable } from "./timeTableRenderer.js";
import { getDurationBetweenTimes, addWeek, addMonth } from "./date.js";

// DOM Variables
const dateSelectionForm = document.getElementById("dateSelectionForm");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const weekPresetButton = document.getElementById("weekPresetButton");
const monthPresetButton = document.getElementById("monthPresetButton");
const daysOptionInput = document.getElementById("daysOption");
const unitOptionInput = document.getElementById("unitOption");
const currentResult = document.getElementById("currentResult");

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