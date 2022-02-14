window.setInterval("update()", 60000)

var today = new Date();
var todayDisplay = document.getElementById("date-today");

var currentDay = today.getDate();
var currentMonth = today.toLocaleDateString("default", {month:"long"});
var currentYear = today.getFullYear();

renderCurrentDay();
function renderCurrentDay(){
    console.log(todayDisplay);
    todayDisplay.innerHTML = `${currentYear}, ${currentMonth} ${currentDay}`;
}

function update(){
    newToday = new Date();
    if(newToday.getDate() === currentDay) return;
    window.location.reload();
}