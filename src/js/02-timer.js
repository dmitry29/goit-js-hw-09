import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),

  interfaceEL: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};

let intervalId = null;

refs.inputEl.disabled = false;
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onButtonStart);

function onButtonStart() {
  refs.inputEl.disabled = true;
  refs.startBtn.disabled = true;

  intervalId = setInterval(() => {
    const selectTime = new Date(refs.inputEl.value);
    const deltaTime = selectTime - Date.now();

    if (deltaTime <= 1000) {
      clearInterval(intervalId);
      refs.inputEl.disabled = false;
      refs.startBtn.disabled = false;

      Notify.success('Finish!');
    }
    updateInterface(deltaTime);
  }, 1000);
}

function updateInterface(deltaTime) {
  const data = convertMs(deltaTime);
  Object.entries(data).forEach(([key, value]) => {
    refs.interfaceEL[key].textContent = addLeadingZero(value);
      return;
    }
  );
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      refs.startBtn.disabled = false;
    } else {
      Notify.warning('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}