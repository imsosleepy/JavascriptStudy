const select = document.querySelector(".country");

function selectEvent() {
  const index = select.selectedIndex;
  if(index !== 0){
    const key = "country";
    const value = select.options[index].value;
    localStorage.setItem(key, value);
  }
  
}

function init() {
  select.addEventListener("change", selectEvent);
}

init();
