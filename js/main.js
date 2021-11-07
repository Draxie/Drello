let changeForm = document.querySelector(".change-form");
let groupNameInput = document.querySelector("#group-name-input");
let groupName = document.querySelector("#group-name");
let workspace = document.querySelector(".workspace");
alert("Click on edit icon to enable text input");

/* ----------- Changing Group Name ----------- */

groupNameInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    Expand();
    groupNameInput.value = "";
  }
});

function Expand() {
  SetName();
  changeForm.classList.toggle("expanded");
}

function SetName() {
  if (groupNameInput.value != "") {
    groupName.innerHTML = groupNameInput.value;
    localStorage.setItem("group name", groupNameInput.value);
  }
}

/* ----------- Create New List ----------- */

function CreateNewList() {
  let container = document.createElement("div");
  container.classList.add("container");
  container.innerHTML =
    '<div class="list-name"> <i class="far fa-edit" onclick="ToggleInput(this)"></i> <input type="text"' +
    'placeholder="List Name" disabled> <button class="remove" onclick="RemoveList(this)"> <i class="fas fa-times"></i> </button>' +
    '</div> <hr> <div class="add-new-card container-element" onclick="CreateNewCard(this)">' +
    '<i class="fas fa-plus"></i> <p>&nbsp&nbsp Add a card</p> </div>';

  /* ----------- Append Card ----------- */

  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (draggable) {
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
    }
  });

  workspace.insertBefore(
    container,
    workspace.children[workspace.children.length - 1]
  );
}

/* ----------- Create New Card ----------- */

function CreateNewCard(e) {
  let card = document.createElement("div");
  card.classList.add("card", "container-element");
  card.innerHTML =
    '<i class="far fa-edit" onclick="ToggleInput(this)"></i> ' +
    '<input type="text" placeholder="Card Name" disabled> <button class="remove" onclick="RemoveCard(this)"> <i class="fas fa-times"></i></button>';
  card.draggable = true;

  card.addEventListener("dragstart", () => {
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  e.parentNode.appendChild(card);
}

/* ----------- Removing ----------- */

function RemoveList(e) {
  workspace.removeChild(e.parentNode.parentNode);
}

function RemoveCard(e) {
  e.parentNode.remove();
}

/* ----------- Toggle Input ----------- */

function ToggleInput(e) {
  let inputField = e.parentNode.children[1];
  if (inputField.disabled) inputField.disabled = false;
  else {
    inputField.setAttribute("value", inputField.value);
    inputField.disabled = true;
  }
}

/* ----------- Drag Drop Position ----------- */

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".card:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

/* ----------- Un/Load Events And Methods ----------- */

window.addEventListener("beforeunload", function () {
  localStorage.setItem("workspace", workspace.innerHTML);
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("workspace"))
    workspace.innerHTML = localStorage.getItem("workspace");
  let containers = document.querySelectorAll(".container");

  containers.forEach((container) =>
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (draggable) {
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      }
    })
  );

  if (localStorage.getItem("group name"))
    groupName.innerHTML = localStorage.getItem("group name");

  let cards = document.querySelectorAll(".card");
  cards.forEach((card) =>
    card.addEventListener("dragstart", () => {
      card.classList.add("dragging");
    })
  );

  cards.forEach((card) =>
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    })
  );
});
