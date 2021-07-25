// VARIABLES
const lista = document.querySelector(".list");
const inputField = document.getElementById("inputTodo");
const cleanAllBtn = document.getElementById("cleanAllBtn");
const cleanDoneBtn = document.getElementById("cleanDoneBtn");
// Um número para criar ids únicas
let randomNum = getRandomInt(1, 1000000);
// Array para guardar itens da lista
let itensLocalStorage = [];

// UTILS FUNCTIONS
const saveToLocalStorage = function () {
  localStorage.setItem("listaDeTarefas", JSON.stringify(itensLocalStorage));
};
const shouldHideElements = () => {
  if (lista.children.length === 0) {
    lista.className = "d-none";
    cleanAllBtn.className = "d-none";
    cleanDoneBtn.className = "d-none";
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const removeListItem = (id) => {
  const elementToDelete = document.getElementById(id);
  elementToDelete.remove();
  const indexItem = itensLocalStorage.findIndex((item) => item.id === id);
  itensLocalStorage.splice(indexItem, 1);
};

// Creation functions
const createListItem = (key, value, checked) => {
  if (!value) {
    window.alert("Insira algo!");
    return;
  }

  // show buttons and list
  lista.className = "list";
  cleanAllBtn.className = "btn btn-danger";
  cleanDoneBtn.className = "btn btn-dark";

  // Parent List
  const listItem = document.createElement("div");
  listItem.className = "list-item";
  randomNum = getRandomInt(1, 1000000);
  // if key is empty, make one
  listItem.id = key ? key : "list-item-" + randomNum;
  lista.appendChild(listItem);

  // create new list item object then push to array
  const newListItem = {
    id: listItem.id,
    value: value,
    checked: checked,
  };
  itensLocalStorage.push(newListItem);

  // Check button
  const listItemCheck = document.createElement("input");
  listItemCheck.type = "checkbox";
  listItemCheck.className = "form-check-input list-item-check";
  listItem.appendChild(listItemCheck);

  // Check functionality
  const checkItem = (checked) => {
    const indexItem = itensLocalStorage.findIndex(
      (item) => item.id === listItem.id
    );
    if (checked) {
      listItemText.style = "text-decoration: line-through";
      listItem.style = "background-color: #6610f2;";
      listItemCheck.checked = true;
      itensLocalStorage[indexItem].checked = true;
    } else {
      listItemText.style = "text-decoration: none";
      listItem.style = "background-color: #f4a261;";
      listItemCheck.checked = false;
      itensLocalStorage[indexItem].checked = false;
    }
    saveToLocalStorage();
  };
  listItemCheck.addEventListener("click", (e) => {
    checkItem(e.target.checked);
  });
  listItemCheck.click = checkItem;

  // Item-Texto Lista
  const listItemText = document.createElement("p");
  listItemText.className = "list-item-text";
  listItemText.innerText = value;
  listItemText.value = value;
  listItemCheck.after(listItemText);

  // Close/Remove button
  const listItemRemove = document.createElement("button");
  listItemRemove.type = "button";
  listItemRemove.className = "btn-close list-item-icon";

  listItemRemove.addEventListener("click", (e) => {
    const shouldRemove = window.confirm("Deseja mesmo remover a tarefa?");
    if (shouldRemove) {
      removeListItem(e.target.parentElement.id);
      shouldHideElements();
      saveToLocalStorage();
    }
  });

  // Render Check
  checkItem(checked);

  listItemText.after(listItemRemove);

  return;
};

const createListFromLocalStorage = () => {
  if (localStorage.getItem("listaDeTarefas")) {
    const listOfItems = JSON.parse(localStorage.getItem("listaDeTarefas"));
    for (let index = 0; index < listOfItems.length; index++) {
      const id = listOfItems[index].id;
      const value = listOfItems[index].value;
      const checked = listOfItems[index].checked;
      createListItem(id, value, checked);
    }
  }
};

// EVENTS FUNCTIONS
const onSubmit = () => {
  createListItem("", inputField.value, false);

  // clear inputField
  inputField.value = "";
  inputField.focus();

  saveToLocalStorage();
};

const onClickCleanAll = () => {
  const shouldRemove = window.confirm("Deseja mesmo remover TODAS as tarefas?");

  if (shouldRemove) {
    //Clone array
    const stub = [...itensLocalStorage];
    for (let index = 0; index < stub.length; index++) {
      const key = stub[index].id;
      removeListItem(key);
    }
    shouldHideElements();
    saveToLocalStorage();
  }
};

const onClickCleanDone = () => {
  const shouldRemove = window.confirm(
    "Deseja mesmo remover as tarefas concluídas?"
  );

  if (shouldRemove) {
    //Clone array
    const stub = [...itensLocalStorage];
    for (let index = 0; index < stub.length; index++) {
      const key = stub[index].id;
      const checked = stub[index].checked;
      if (checked) {
        removeListItem(key);
      }
    }
    shouldHideElements();
    saveToLocalStorage();
  }
};

// Save when unload event fires
window.addEventListener("unload", saveToLocalStorage);
window.unload = saveToLocalStorage;

createListFromLocalStorage();
