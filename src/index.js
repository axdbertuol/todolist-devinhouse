const lista = document.querySelector(".list");
const inputField = document.getElementById("inputTodo");
const cleanAllBtn = document.getElementById("cleanAllBtn");
const cleanDoneBtn = document.getElementById("cleanDoneBtn");

// TODO: check array length localstorage
let numOfListItems = 0;
let localStorageItens = [];

const createListItem = (key, value, checked) => {
  if (!value) {
    window.alert("Insira algo!");
    return;
  }
  if (lista.className.search("d-none")) {
    lista.className = "list";
  }

  numOfListItems++;
  // Parent List
  const listItem = document.createElement("div");
  listItem.className = "list-item";
  listItem.id = key ? key : "list-item-" + numOfListItems;
  lista.appendChild(listItem);

  // Push to array
  localStorageItens.push({
    id: listItem.id,
    value: value,
    checked: checked || false,
  });

  // Check button
  const listItemCheck = document.createElement("input");
  listItemCheck.type = "checkbox";
  listItemCheck.className = "form-check-input list-item-check";
  listItem.appendChild(listItemCheck);

  // Procura index do item referido
  let itemIndex = localStorageItens.findIndex(
    (item) => item.id === listItem.id
  );

  listItemCheck.addEventListener("click", (e) => {
    checkItem(e.target.checked);
    if (e.target.checked) {
      // Save to array
      localStorageItens[itemIndex] = {
        ...localStorageItens[itemIndex],
        checked: true,
      };
    } else {
      // Remove item from array
      localStorageItens[itemIndex] = {
        ...localStorageItens[itemIndex],
        checked: false,
      };
    }

    // Save to localStorage
    localStorage.setItem(
      listItem.id,
      JSON.stringify(localStorageItens[itemIndex])
    );
  });

  // Texto Lista
  const listItemText = document.createElement("p");
  listItemText.className = "list-item-text";
  listItemText.innerText = value;
  listItemText.value = value;
  listItemCheck.after(listItemText);

  // Save to localStorage
  localStorage.setItem(
    listItem.id,
    JSON.stringify(localStorageItens[itemIndex])
  );

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

  // Check item if checked was passed in as arg
  checkItem(checked);

  // AFTER listItemText

  // Close button
  const listItemRemove = document.createElement("button");
  listItemRemove.type = "button";
  listItemRemove.className = "btn-close list-item-icon";

  listItemRemove.addEventListener("click", (e) => {
    const shouldRemove = window.confirm("Deseja mesmo remover a tarefa?");
    if (shouldRemove) {
      // find position to remove
      let position = localStorageItens.findIndex(
        (item) => item.id === e.target.parentElement.id
      );
      localStorageItens.splice(position, 1);
      localStorage.removeItem(e.target.parentElement.id);
      const elementToDelete = document.getElementById(
        e.target.parentElement.id
      );
      numOfListItems--;
      elementToDelete.remove();
    }
  });

  listItemText.after(listItemRemove);

  // CLEAN BUTTONS

  cleanAllBtn.className = "btn btn-dark";
  cleanDoneBtn.className = "btn btn-dark";

  return;
};

const createListFromLocalStorage = () => {
  if (localStorage.length > 0) {
    numOfListItems = localStorageItens.length;
    for (let index = localStorage.length - 1; index >= 0; index--) {
      const key = localStorage.key(index);
      const obj = JSON.parse(localStorage.getItem(key));
      createListItem(key, obj.value, obj.checked);
    }
  }
};

const onSubmit = () => {
  createListItem("", inputField.value, false);
  // clear inputField
  inputField.value = "";
  inputField.focus();
};

createListFromLocalStorage();
