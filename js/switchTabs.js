// DOM Variables
const timeDifferenceTab = document.querySelector(".time-tracker-tab");
const holidayHelperTab = document.querySelector(".holiday-helper-tab");
const timeDifferenceButton = document.querySelector(".time-difference");
const publicHolidaysButton = document.querySelector(".public-holidays");


const saveActiveTabToLocalStorage = (tabName) => {
    localStorage.setItem("activeTab", tabName);
};

const switchToTimeDifferenceTab = () => {
    timeDifferenceTab.classList.add("visible"); 
    holidayHelperTab.classList.remove("visible");
    saveActiveTabToLocalStorage("time-difference");
};

const switchToPublicHolidaysTab = () => {
    timeDifferenceTab.classList.remove("visible"); 
    holidayHelperTab.classList.add("visible"); 
    saveActiveTabToLocalStorage("public-holidays"); 
};


export const restoreActiveTab = () => {
    const activeTab = localStorage.getItem("activeTab");

    timeDifferenceTab.classList.remove("active", "visible");
    holidayHelperTab.classList.remove("active", "visible");

    if (activeTab === "public-holidays") {
        holidayHelperTab.classList.add("active", "visible");
    } else {
        timeDifferenceTab.classList.add("active", "visible");
    }
};

timeDifferenceButton.addEventListener("click", switchToTimeDifferenceTab);
publicHolidaysButton.addEventListener("click", switchToPublicHolidaysTab);