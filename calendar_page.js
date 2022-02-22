today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

showCalendar(currentMonth, currentYear);
changeDateSidebar(today);
selectCurrentDate(currentYear, currentMonth, today.getDate());

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

var selectedDay;
var selectedMonth;
var selectedYear;

function saveWrittenReminderToJSON(element) {
    localStorage.setItem(`${selectedYear}-${selectedMonth}-${selectedDay}`, element.value);
    console.log(`${selectedYear}-${selectedMonth}-${selectedDay}`);
}

function changeDateSidebar(date) {
    dateSelected = document.getElementById("date-sidebar");
    var currentDay = date.getDate();
    var currentMonth = date.toLocaleDateString("default", { month: "long" });
    var currentYear = date.getFullYear();
    dateSelected.innerHTML = `${currentMonth} ${currentDay}, ${currentYear}`;

    reminderOfDate = document.getElementById("todolist");
    reminderOfDate.value = localStorage.getItem(`${currentYear}-${currentMonth}-${currentDay}`);
    console.log(`${currentYear}-${currentMonth}-${currentDay}`);
    console.log(`${selectedYear}-${selectedMonth}-${selectedDay}`);

    selectedDay = currentDay;
    selectedMonth = currentMonth;
    selectedYear = currentYear;
}


function selectCurrentDate(year, month, date) {

    var previousSelected = document.getElementsByClassName("selected-date")[0];
    if (previousSelected != undefined) {
        previousSelected.classList.remove("selected-date");
    }


    var selectedDay = document.getElementById(`${year}-${month}-${date}`);
    selectedDay.querySelector("div").setAttribute("class", "selected-date");
    changeDateSidebar(new Date(year, month, date));


}

function goToToday() {
    showCalendar(today.getMonth(), today.getFullYear());
    selectCurrentDate(today.getFullYear(), today.getMonth(), today.getDate());
}

function showCalendar(month, year) {

    sheet = document.styleSheets[0];

    let firstDay = (new Date(year, month)).getDay();

    calendarMonth = document.getElementById("calendar-month");
    calendarMonth.innerHTML = `${months[currentMonth]} ${currentYear}`;

    tbl = document.getElementById("calendar-body");

    tbl.innerHTML = "";

    daysInTheMonth = daysInMonth(month, year);





    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                link = document.createElement("a");
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                link.appendChild(cellText);
                cell.appendChild(link);
                row.appendChild(cell);
            }
            else if (date > daysInTheMonth) {
                break;
            }

            else {
                link = document.createElement("a");
                cell = document.createElement("td");
                dateDiv = document.createElement("div");
                cell.setAttribute("id", `${year}-${month}-${date}`);



                link.setAttribute("href", "#");
                link.setAttribute("onClick", `return selectCurrentDate(${year},${month},${date})`);


                cellText = document.createTextNode(date);

                if ((daysInTheMonth + firstDay) % 7 != 0) {
                    if (firstDay + 1 < 6 || daysInTheMonth == 28) {
                        if (date == 28 - firstDay) {
                            cell.setAttribute("style", "border-bottom-right-radius: 10px");
                        }
                    }
                    else if (date == 36 - (firstDay + 1)) {
                        cell.setAttribute("style", "border-bottom-right-radius: 10px");
                    }
                }

                dateDiv.appendChild(cellText);
                link.appendChild(dateDiv);
                cell.appendChild(link);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row);

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