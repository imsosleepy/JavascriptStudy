const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList"),
      finishList = document.querySelector(".js-finishList");


const TODOS_LS = 'toDos';
const FINISH_LS = 'finished';

let toDos = [];
let finished = [];
let idcounter = 0;

function deleteToDo(event, task) {
    const li = event.target.parentNode;
    if(task === "pending") {
        toDoList.removeChild(li);
        const cleanTodos = toDos.filter(function(toDo) {
            // li.id가 string이라 바로 처리하면 안됨
            return toDo.id !== parseInt(li.id);
        });
        toDos = cleanTodos;
        saveToDos();
    } else {
        finishList.removeChild(li);
        const cleanFinish = finished.filter(function(finish) {
            // li.id가 string이라 바로 처리하면 안됨
            return finish.id !== parseInt(li.id);
        });
        finished = cleanFinish;
        savefinished();
    }
}

function swapToDo(event, task) {
    const li = event.target.parentNode;
    let temp = {};
    if(task === "pending") {
        toDoList.removeChild(li);
        const cleanTodos = toDos.filter(function(toDo){
            if(toDo.id === parseInt(li.id)) {
                temp = toDo;
                temp.task = "finished";
            }
            return toDo.id !== parseInt(li.id);
        });
        toDos = cleanTodos;
        saveToDos();
    } else { //li.task === "finished"
        finishList.removeChild(li);
        const cleanFinish = finished.filter(function(finish){
            if(finish.id === parseInt(li.id)) {
                temp = finish;
                temp.task = "pending";
            }
            return finish.id !== parseInt(li.id);
        });
        finished = cleanFinish;
        savefinished();
    }
    console.log(temp);
    paintToDo(temp.text, temp.task);
}


function paintToDo(text, task) {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    idcounter = idcounter + 1;
    const swapBtn = document.createElement("button");
    if(task === "pending"){
        swapBtn.innerText = "⭕";
    } else if(task === "finished") {
        // task == finished
        swapBtn.innerText = "🔄";
    }
    swapBtn.addEventListener("click", (event) => swapToDo(event, task));
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", (event) => deleteToDo(event, task));
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(swapBtn);
    li.id = idcounter;
    const taskObj = {
        task: task,
        text: text,
        id: idcounter
    }
    save(li, task, taskObj);
}

function save(li, task, taskObj){
    if(task === "pending"){
        //localStorage엔 string만 저장할 수 있다...
        //때문에 자바스크립트 object를 stringjson형태로 바꿔서 저장해줘야 한다.
        toDoList.appendChild(li);
        toDos.push(taskObj);
        localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
        
    }else {
        finishList.appendChild(li);
        finished.push(taskObj);
        localStorage.setItem(FINISH_LS, JSON.stringify(finished));
    }
}

function saveToDos() {
    //localStorage엔 string만 저장할 수 있다...
    //때문에 자바스크립트 object를 stringjson형태로 바꿔서 저장해줘야 한다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function savefinished() {
    localStorage.setItem(FINISH_LS, JSON.stringify(finished));
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    const task = "pending";
    paintToDo(currentValue, task);
    toDoInput.value="";
}

function localToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedFinish = localStorage.getItem(FINISH_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text, "pending");
        });
    } 
    if(loadedFinish !== null){
        const parsedFinish = JSON.parse(loadedFinish);
        parsedFinish.forEach(function(finish) {
            paintToDo(finish.text, "finished");
        });
    }

}

function init() {
    localToDos();
    idcounter = finished.length + toDos.length + 1;
    toDoForm.addEventListener("submit", handleSubmit);
}

init();