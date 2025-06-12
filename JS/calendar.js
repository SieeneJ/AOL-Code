// Calendar
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedDay = new Date().getDate();
let selectedMonth = currentMonth;
let selectedYear = currentYear;

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

document.addEventListener('DOMContentLoaded', function() {
    generateCalendar(currentMonth, currentYear);
    changeEvents();

    document.getElementById('search-bar').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const eventCards = document.querySelectorAll('.event-card');
        
        eventCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.event-description').textContent.toLowerCase();
            const address = card.querySelector('.event-address').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || address.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

});



function generateCalendar(month, year) {
    const calendarDates = document.getElementById('calendar-dates');
    const calendarTitle = document.getElementById('calendar-title');
    
    calendarTitle.textContent = `${months[month]} ${year}`;
    calendarDates.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day', 'empty');
        calendarDates.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = day;

        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayCell.classList.add('today');
        }

        dayCell.addEventListener('click', () => {
            selectedDay = day;
            selectedMonth = month;
            selectedYear = year;

            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            dayCell.classList.add('selected');

            changeEvents();
        });

        calendarDates.appendChild(dayCell);
    }
}

function navigateMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

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
  const dateStr = `${selectedDay} ${months[selectedMonth]} ${selectedYear}`;

  const displayText = isToday ? `Today, ${dateStr}` : `${dayName}, ${dateStr}`;
  document.getElementById("selectedDate").textContent = displayText;

  // Dummy event content
  document.getElementById("recipeTitle").textContent = "Recipe of the Day";
  document.getElementById("recipeContent").textContent = "Classic Chicken Consommé";

  document.getElementById("eventTitle").textContent = "FoodFest ‘25";
  document.getElementById("eventDetails").textContent = "Address, 00:00–00:00";
}
