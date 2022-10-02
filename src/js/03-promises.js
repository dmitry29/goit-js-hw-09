import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  buttonSubmit: document.querySelector('button[type="submit"]'),
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

refs.buttonSubmit.addEventListener('click', onCreatPromise);

function onCreatPromise(e) {
  e.preventDefault();
  let startDelay = Number(refs.delayEl.value);
  let stepDelay = Number(refs.stepEl.value);
  for (let i = 0; i < refs.amountEl.value; i += 1) {
    createPromise(1 + i, startDelay + i * stepDelay).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }).catch(({ position, delay}) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
};