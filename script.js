// Filter category All completed active
const filter = document.querySelector(".filter");
const filterSelected = document.querySelector(".filter__selected");
const filterList = document.querySelector(".filter__list");

// Notes
const notes = document.querySelector(".notes");
const notesItem = document.querySelectorAll(".notes__item");

//modal Add note Cancel modal
const addBtn = document.querySelector(".add__btn");
const modalWrap = document.querySelector(".modal__wrap");
const cancelBtn = document.querySelector(".modal__btn-cancel");
const applyBtn = document.querySelector(".modal__btn-apply");
const modalInput = document.querySelector(".modal__input");

// search
const searchInput = document.querySelector(".search__input");

// arrays
const filterListCategoryArr = ["All", "Completed", "Incomplete"];
const notesArr = ["note 1", "note 2", "note 3", "note 4"];

const notesObj = [
  {
    note: "note 1",
    isChecked: true,
  },
  {
    note: "note 2",
    isChecked: false,
  },
  {
    note: "note 3",
    isChecked: true,
  },
  {
    note: "note 4",
    isChecked: false,
  },
  {
    note: "new note",
    isChecked: true,
  },
];

// functions

function renderNotes() {
  notes.innerHTML = "";
  notesObj.forEach((item) => {
    const notesItemCheck = document.createElement("li");
    notesItemCheck.classList.add("notes__item");

    notesItemCheck.innerHTML = `
        <div class="notes__item-check">
          <img src="/img/icons/checked.png" alt="checked" />
        </div>
        <div class="notes__descr">${item.note}</div>
        <div class="options">
          <span class="options__pencil"></span>
          <span class="options__trash"></span>
        </div>`;

    if (item.isChecked) {
      notesItemCheck.classList.add("checked");
    }
    notes.appendChild(notesItemCheck);
  });
}

function filterListFunc() {
  filter.addEventListener("click", () => {
    filter.classList.toggle("open"); // открывает/закрывает список
  });

  const items = filter.querySelectorAll(".filter__item");

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      filterSelected.textContent = item.textContent; // меняем выбранный текст
    });
  });
}

function openModalAddNote() {
  addBtn.addEventListener("click", () => {
    modalWrap.classList.add("modal__open");
  });
}

function cancelModalAddNote() {
  cancelBtn.addEventListener("click", () => {
    if (modalWrap.classList.contains("modal__open"))
      modalWrap.classList.remove("modal__open");
    modalInput.classList.remove("modal__input-error");
  });
}

function addNote() {
  applyBtn.addEventListener("click", () => {
    let value = modalInput.value;
    if (value === "") {
      modalInput.classList.add("modal__input-error");
      return;
    }
    const newNote = { note: value, isChecked: false };
    notesObj.push(newNote);
    modalWrap.classList.remove("modal__open");
    modalInput.classList.remove("modal__input-error");
    modalInput.value = "";

    console.log(notesObj);

    renderNotes();
  });
}

// function init
renderNotes();

filterListFunc();
openModalAddNote();
cancelModalAddNote();

addNote();
