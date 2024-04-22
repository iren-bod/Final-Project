import { initCalculatingTab } from "./date.js";
import { switchTabs } from "./switchTabs.js";
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

document.addEventListener("DOMContentLoaded", function() {
    switchTabs();
    initCalculatingTab();
    restoreActiveTab(); 
    initHolidayTab();
});