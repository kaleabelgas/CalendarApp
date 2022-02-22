today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

showCalendar(currentMonth, currentYear);
changeDateSidebar(today);

function nextMonth() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previousMonth() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function changeDateSidebar(date) {
    dateSelected = document.getElementById("date-sidebar");
    var currentDay = date.getDate();
    var currentMonth = date.toLocaleDateString("default", { month: "long" });
    var currentYear = date.getFullYear();
    dateSelected.innerHTML = `${currentMonth} ${currentDay}, ${currentYear}`;
}

function showCalendar(month, year) {
    let firstDay = (new Date(year, month)).getDay();

    calendarMonth = document.getElementById("calendar-month");
    calendarMonth.innerHTML = `${months[currentMonth]} ${currentYear}`;

    tbl = document.getElementById("calendar-body");

    tbl.innerHTML = "";



    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }

        }
        tbl.appendChild(row);

        var sheet = document.styleSheets[0];

        if ((daysInMonth(month, year) + firstDay) % 7 != 0) {
            sheet.insertRule("#calendar tr:nth-last-child(2) td:last-child {border-bottom-right-radius: 10px;}");
        }

        var mytable = document.getElementById("calendar-body");
        var myrows = mytable.getElementsByTagName("tr");
        var lastrow = myrows[myrows.length - 1];
        var mycells = lastrow.getElementsByTagName("td");
        var lastcell = mycells[mycells.length - 1].textContent;
        if (lastcell == daysInMonth(month, year)) break;
    }

}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
