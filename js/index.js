import { initCalculatingTab } from "./date.js";
import { initHolidayTab } from "./countries.js";

const restoreActiveTab = () => {
    const activeTab = localStorage.getItem("activeTab");
    if (activeTab) {
        const tabButton = document.querySelector(`.${activeTab}`);
        if (tabButton) {
            tabButton.click(); 
        }
    }
}

initCalculatingTab();
initHolidayTab();

window.addEventListener('DOMContentLoaded', () => {
    restoreActiveTab();
})