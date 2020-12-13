const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList")


const TODOS_LS = 'toDos';

let toDos = [];
let finished = [];

function deleteToDo(event) {
    const li = event.target.parentNode;
    toDoList.removeChild(li);
    const cleanTodos = toDos.filter(function(toDo){
        // li.id가 string이라 바로 처리하면 안됨
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanTodos;
    saveToDos();
}

function duplicateChecker(object, id) {
    let max = id;
    toDos.forEach(function(object){
        max = Math.max(toDo.id, max);
    });
    const newId = max + 1;
    return newId;
}

function paintToDo(text) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    let newId = duplicateChecker(toDos, toDos.length+1);
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    toDoList.appendChild(li);
    li.id = newId;
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function saveToDos() {
    //localStorage엔 string만 저장할 수 있다...
    //때문에 자바스크립트 object를 stringjson형태로 바꿔서 저장해줘야 한다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function localToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    } 
}

function init() {
    localToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();