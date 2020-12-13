const rangeForm = document.querySelector(".js-rangeForm"),
      genNumText = document.querySelector(".generateNum"),
      rangeInput = rangeForm.querySelector(".rangeInput"),
      playBtn = rangeForm.querySelector(".playBtn"),
      rangeText = rangeForm.querySelector(".textInput"),
      choseText = document.querySelector(".choseText"),
      result = document.querySelector(".result");


function generateRandomNumber() {
    return parseInt(Math.random() * rangeInput.value);
}

function handleInput() {
    genNumText.innerText = `Generate a number between 0 and ${rangeInput.value}`
}

function handleClick() {
    const chose = parseInt(rangeText.value);
    const machineChose = parseInt(rangeInput.value);
    choseText.innerText = `You chose: ${chose}, the machine chose: ${machineChose}.`
    if(chose < machineChose){
        result.innerText = "You lost!"
    } else if( chose > machineChose) {
        result.innerText = "You won!"
    } else {
        result.innerText = "Draw!"
    }
}

function init() {
    playBtn.addEventListener("click",handleClick);
    rangeInput.addEventListener("input", handleInput);
}

init();

