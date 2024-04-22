const STORAGE_KEY = "results";
const STORAGE_LIMIT = 10;

export const results = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; 

export function addRecordToStorage(record) {
    results.push(record);
    results.length > STORAGE_LIMIT && results.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function renderTable() {
    let dataTable = document.querySelector(".history-data__table");
    let tableBody = document.getElementById("historyDataTable"); 
    dataTable.classList.remove("disabled");

    while(tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    results.slice().reverse().forEach((record) => {
        let newRow = document.createElement("tr");

        let startDateCell = document.createElement("td");
        startDateCell.innerText = record.startDate;
        newRow.appendChild(startDateCell);

        let endDateCell = document.createElement("td");
        endDateCell.innerText = record.endDate;
        newRow.appendChild(endDateCell);
        
        let resultCell = document.createElement("td");
        resultCell.innerText = record.result;
        newRow.appendChild(resultCell);

        tableBody.appendChild(newRow);
    });   
}