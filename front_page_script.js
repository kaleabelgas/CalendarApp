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

    frontPageArea = document.getElementById("front-page-todo");

    todoToday = localStorage.getItem(`${currentYear}-${currentMonth}-${currentDay}`);

    if(todoToday == "" || todoToday == null){
        frontPageArea.innerHTML = "Nothing for this day! What do you want to do?";
    }
    else{
        frontPageArea.innerHTML = localStorage.getItem(`${currentYear}-${currentMonth}-${currentDay}`);
    }
}

function update(){
    newToday = new Date();
    if(newToday.getDate() === currentDay) return;
    window.location.reload();
}