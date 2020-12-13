// You're gonna need this
const NINE_HOURS_MILLISECONDS = 32400000;

const clockContainer = document.querySelector(".js-clock");
const clockTitle = document.querySelector(".js-title");

function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2020-12-24:00:00:00+0900");
  const now = new Date();
  const differ = (xmasDay - now) / 1000;
  const day = Math.floor(differ / (60 * 60 * 24));
  const hours = Math.floor((differ / (60 * 60)) % 24);
  const minutes = Math.floor((differ / 60) % 60);
  const seconds = Math.floor(differ % 60);
  clockTitle.innerText = `${day < 10 ? `0${day}` : day}d ${
    hours < 10 ? `0${hours}` : hours
  }h ${minutes < 10 ? `0${minutes}` : minutes}m ${
    seconds < 10 ? `0${seconds}` : seconds
  }s`;
}

function init() {
  setInterval(getTime, 1000);
}

init();
