let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDay = new Date().getDate();
let selectedMonth = currentMonth;
let selectedYear = currentYear;

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

document.addEventListener("DOMContentLoaded", () => {
  renderCalendar(currentMonth, currentYear);
  changeEvents();
});

function renderCalendar(month, year) {
  const daysContainer = document.getElementById('calendarDays');
  const monthYearLabel = document.getElementById('monthAndYear');
  daysContainer.innerHTML = '';

  const firstDay = new Date(year, month).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  monthYearLabel.textContent = `${monthNames[month]} ${year}`;

  // Blank starting cells
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    blank.classList.add('empty');
    daysContainer.appendChild(blank);
  }

  const today = new Date();

  for (let day = 1; day <= totalDays; day++) {
    const dateButton = document.createElement("button");
    dateButton.classList.add('day');
    dateButton.innerText = day;

    const date = new Date(year, month, day);

    // Highlight today's date
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      dateButton.classList.add("today");
    }

    dateButton.addEventListener("click", () => {
      // Update selected date
      selectedDay = day;
      selectedMonth = month;
      selectedYear = year;

      // Remove all underline styles
      const allButtons = document.querySelectorAll("#calendarDays button");
      allButtons.forEach(btn => btn.classList.remove("active"));

      // Add underline to this one
      dateButton.classList.add("active");

      changeEvents();
    });

    daysContainer.appendChild(dateButton);
  }
}

document.getElementById('prevMonth').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

function changeEvents() {
  const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
  const today = new Date();

  const isToday = (
    selectedDate.getDate() === today.getDate() &&
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getFullYear() === today.getFullYear()
  );

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = dayNames[selectedDate.getDay()];
  const dateStr = `${selectedDay} ${monthNames[selectedMonth]} ${selectedYear}`;

  const displayText = isToday ? `Today, ${dateStr}` : `${dayName}, ${dateStr}`;
  document.getElementById("selectedDate").textContent = displayText;

  // Dummy event content
  document.getElementById("recipeTitle").textContent = "Recipe of the Day";
  document.getElementById("recipeContent").textContent = "Classic Chicken Consommé";

  document.getElementById("eventTitle").textContent = "FoodFest ‘25";
  document.getElementById("eventDetails").textContent = "Address, 00:00–00:00";
}