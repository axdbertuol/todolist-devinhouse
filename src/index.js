const lista = document.querySelector(".list");
const inputField = document.getElementById("inputTodo");
// TODO: check array length localstorage
let numOfListItems = 0;
let localStorageItens = [];

const createListItem = (key, value) => {
  if (!value) {
    window.alert("Insira algo!");
    return;
  }
  if (!key) {
  }
  if (lista.className.search("d-none")) {
    lista.className = "list";
  }

  numOfListItems++;

  // Parent List
  const listItem = document.createElement("div");
  listItem.className = "list-item";
  listItem.id = "list-item-" + numOfListItems;
  lista.appendChild(listItem);

  // Save to localStorage
  // console.log("salvendo key", listItem.id);
  // console.log("salvendo value", value);
  localStorage.setItem(listItem.id, value);

  // Texto Lista
  const listItemText = document.createElement("p");
  listItemText.className = "list-item-text";
  listItemText.innerText = value;
  listItemText.value = value;
  listItem.appendChild(listItemText);

  // after listItemText
  // Check button
  const listItemCheck = document.createElement("input");
  listItemCheck.type = "checkbox";
  listItemCheck.className = "form-check-input list-item-check";
  listItemCheck.id = "list-item-check-" + numOfListItems;
  listItemCheck.addEventListener("click", (e) => {
    if (e.target.checked) {
      listItemText.style = "text-decoration: line-through";
      return;
    }
    listItemText.style = "text-decoration: none";
  });
  listItemText.after(listItemCheck);

  // Remove button
  const listItemRemove = document.createElement("button");
  listItemRemove.type = "button";
  listItemRemove.className = "btn-close list-item-icon";

  listItemRemove.addEventListener("click", (e) => {
    console.log(e.target.parentElement.id);
    //TODO: prompt delete or no
    localStorage.removeItem(e.target.parentElement.id);
    const elementToDelete = document.getElementById(e.target.parentElement.id);
    numOfListItems--;
    elementToDelete.remove();
  });

  listItemCheck.after(listItemRemove);

  return;
};

const createListFromLocalStorage = () => {
  if (localStorage.length > 0) {
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      console.log("key", key);
      console.log("localStorage.getItem(key)", localStorage.getItem(key));
      createListItem(key, localStorage.getItem(key));
    }
  }
};

const onSubmit = () => {
  createListItem("", inputField.value);
  // clear inputField
  inputField.value = "";
  inputField.focus();
};

const getLocalStorageItems = () => {
  if (localStorage.length > 0) {
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      // localStorageItens.push({ text: localStorage.getItem(key) });
    }
  }
};

createListFromLocalStorage();
