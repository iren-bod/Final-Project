export const initSwitchTabs = () => {
    const timeDifferenceTab = document.querySelector(".time-tracker-tab");
    const holidayHelperTab = document.querySelector(".holiday-helper-tab");
    const timeDifferenceButton = document.querySelector(".time-difference");
    const publicHolidaysButton = document.querySelector(".public-holidays");

    timeDifferenceButton.addEventListener("click", function() {
        timeDifferenceTab.classList.add("visible"); 
        holidayHelperTab.classList.remove("visible");
        saveActiveTabToLocalStorage("time-difference");
    })

    publicHolidaysButton.addEventListener("click", function() {
        timeDifferenceTab.classList.remove("visible"); 
        holidayHelperTab.classList.add("visible"); 
        saveActiveTabToLocalStorage("public-holidays"); 
    })
}

const saveActiveTabToLocalStorage = (tabName) => {
    localStorage.setItem("activeTab", tabName);
}