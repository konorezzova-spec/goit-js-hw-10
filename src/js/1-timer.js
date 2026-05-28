import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const date = document.querySelector('#datetime-picker');
const hoursLeft = document.querySelector('span[data-hours]');
const daysLeft = document.querySelector('span[data-days]');
const minutesLeft = document.querySelector('span[data-minutes]');
const secondsLeft = document.querySelector('span[data-seconds]');
daysLeft.textContent = '00';
hoursLeft.textContent = '00';
minutesLeft.textContent = '00';
secondsLeft.textContent = '00';
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;
let userSelectedDate = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    "locale": {
        "firstDayOfWeek": 1 // start week on Monday
    },
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            iziToast.show({
                theme: 'dark',
                iconUrl: '/img/bi_x-octagon.svg',
                title: 'Error',
                message: "Please choose a date in the future",
                position: "topRight",
                backgroundColor: "#ef4040",
                progressBarColor: "#b51b1b",
            });
            startBtn.disabled = true;
            return;
        }
        startBtn.disabled = false;
        userSelectedDate = selectedDates[0];
        console.log(selectedDates[0]);
    },
};

flatpickr(date, options);



startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    date.disabled = true;
    const timerId = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = userSelectedDate - currentTime;
        if (deltaTime <= 0) {
            clearInterval(timerId);
            date.disabled = false;
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        daysLeft.textContent = addLeadingZero(days);
        hoursLeft.textContent = addLeadingZero(hours);
        minutesLeft.textContent = addLeadingZero(minutes);
        secondsLeft.textContent = addLeadingZero(seconds);
    }, 1000);
});

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
