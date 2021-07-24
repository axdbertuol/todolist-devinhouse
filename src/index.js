const lista = document.querySelector(".list");
const inputField = document.getElementById("inputTodo");
const cleanAllBtn = document.getElementById("cleanAllBtn");
const cleanDoneBtn = document.getElementById("cleanDoneBtn");

let numOfListItemsCreated = localStorage.length;

// UTILS FUNCTIONS
const shouldHideElements = () => {
  if (lista.children.length === 0) {
    lista.className = "d-none";
    cleanAllBtn.className = "d-none";
    cleanDoneBtn.className = "d-none";
  }
};

const removeListItem = (id) => {
  const elementToDelete = document.getElementById(id);
  elementToDelete.remove();
  localStorage.removeItem(id);
};

// Creation functions
const createListItem = (key, value, checked) => {
  if (!value) {
    window.alert("Insira algo!");
    return;
  }

  // show buttons and list
  lista.className = "list";
  cleanAllBtn.className = "btn btn-dark";
  cleanDoneBtn.className = "btn btn-dark";

  // Parent List
  const listItem = document.createElement("div");
  listItem.className = "list-item";
  numOfListItemsCreated++;
  // if key is empty, make one
  listItem.id = key ? key : "list-item-" + numOfListItemsCreated;
  lista.appendChild(listItem);

  // create new list item object
  const newListItem = {
    value: value,
    checked: checked,
  };

  // Check button
  const listItemCheck = document.createElement("input");
  listItemCheck.type = "checkbox";
  listItemCheck.className = "form-check-input list-item-check";
  listItem.appendChild(listItemCheck);

  listItemCheck.addEventListener("click", (e) => {
    checkItem(e.target.checked);
    if (e.target.checked) {
      // Save to localStorage
      localStorage.setItem(
        listItem.id,
        JSON.stringify({ ...newListItem, checked: true })
      );
    } else {
      localStorage.setItem(
        listItem.id,
        JSON.stringify({ ...newListItem, checked: false })
      );
    }
  });

  // Item-Texto Lista
  const listItemText = document.createElement("p");
  listItemText.className = "list-item-text";
  listItemText.innerText = value;
  listItemText.value = value;
  listItemCheck.after(listItemText);

  // Save to localStorage
  localStorage.setItem(listItem.id, JSON.stringify(newListItem));

  const checkItem = (checked) => {
    if (checked) {
      listItemText.style = "text-decoration: line-through";
      listItem.style = "background-color: #606c38;";
      listItemCheck.checked = true;
    } else {
      listItemText.style = "text-decoration: none";
      listItem.style = "background-color: #f4a261;";
      listItemCheck.checked = false;
    }
  };

  // Check item
  checkItem(checked);

  // AFTER listItemText

  // Close/Remove button
  const listItemRemove = document.createElement("button");
  listItemRemove.type = "button";
  listItemRemove.className = "btn-close list-item-icon";

  listItemRemove.addEventListener("click", (e) => {
    const shouldRemove = window.confirm("Deseja mesmo remover a tarefa?");
    if (shouldRemove) {
      removeListItem(e.target.parentElement.id);
      shouldHideElements();
    }
  });

  listItemText.after(listItemRemove);

  return;
};

const createListFromLocalStorage = () => {
  if (localStorage.length > 0) {
    for (let index = localStorage.length - 1; index >= 0; index--) {
      const key = localStorage.key(index);
      const obj = JSON.parse(localStorage.getItem(key));
      createListItem(key, obj.value, obj.checked);
    }
  }
};

// EVENTS FUNCTIONS
const onSubmit = () => {
  createListItem("", inputField.value, false);
  // clear inputField
  inputField.value = "";
  inputField.focus();
};

const onClickCleanAll = () => {
  const shouldRemove = window.confirm("Deseja mesmo remover TODAS as tarefas?");

  if (shouldRemove) {
    for (let index = localStorage.length - 1; index >= 0; index--) {
      const key = localStorage.key(index);
      removeListItem(key);
    }
    shouldHideElements();
    localStorage.clear();
  }
};

const onClickCleanDone = () => {
  const shouldRemove = window.confirm(
    "Deseja mesmo remover as tarefas concluídas?"
  );

  if (shouldRemove) {
    for (let index = localStorage.length - 1; index >= 0; index--) {
      const key = localStorage.key(index);
      const obj = JSON.parse(localStorage.getItem(key));
      if (obj.checked === true) {
        removeListItem(key);
      }
    }
    shouldHideElements();
  }
};

createListFromLocalStorage();
