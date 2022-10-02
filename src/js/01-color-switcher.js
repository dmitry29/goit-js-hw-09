
const refs = {
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop]'),
  };
  
  let intervalId = null;
  refs.buttonStop.disabled = true;
  
  refs.buttonStart.addEventListener('click', onButtonStart);
  refs.buttonStop.addEventListener('click', onButtonStop);
  
  function onButtonStart() {
    intervalId = setInterval(colorSwitcher, 1000);
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;
  };
  
  function onButtonStop() {
    clearInterval(intervalId);
    refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;
  };
  
  function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };
  
  function colorSwitcher() {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  };
  