import { initCalculatingTab } from "./formHandler.js";
import { initHolidayTab } from "./countries.js";
import { initSwitchTabs } from "./switchTabs.js";

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
initSwitchTabs();
restoreActiveTab();