const lista = document.querySelector(".list");
const inputField = document.getElementById("inputTodo");
let numOfListItems = 0;

const createListItem = () => {
  if (!inputField.value) {
    console.log("nao da");
    return;
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

  // Texto Lista
  const listItemText = document.createElement("p");
  listItemText.className = "list-item-text";
  listItemText.id = "list-item-text-" + numOfListItems;
  listItemText.innerText = inputField.value;
  listItemText.value = inputField.value;
  listItem.appendChild(listItemText);

  //after listItemText
  // Check button
  const listItemCheck = document.createElement("input");
  listItemCheck.type = "checkbox";
  listItemCheck.className = "form-check-input list-item-check";
  listItemCheck.id = "list-item-check-" + numOfListItems;
  listItemCheck.addEventListener("click", (e) => {
    console.log(e.target.checked);
    console.log(e.target.id);

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
    const elementToDelete = document.getElementById(e.target.parentElement.id);
    numOfListItems--;
    elementToDelete.remove();
  });
  listItemCheck.after(listItemRemove);
  inputField.value = "";
  inputField.focus();
  return;
};

const onSubmit = () => {
  createListItem();
};
