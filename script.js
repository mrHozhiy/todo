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

let notesObj = [
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

function renderNotes(arrayObjs) {
  if (arrayObjs.length === 0) {
    notes.innerHTML = "";
    let notesItem = document.createElement("li");
    notesItem.classList.add("notes__empty");
    notesItem.innerHTML = `
          <img src="/img/Detective-check-footprint.png" alt="empty" />
          <h3 title title__empty>Empty...</h2>`;
    console.log("empty");
    notes.appendChild(notesItem);
    return;
  }
  notes.innerHTML = "";
  arrayObjs.forEach((item) => {
    // const item = arrayObjs[arrayObjs.length - 1];
    const notesItem = document.createElement("li");
    notesItem.classList.add("notes__item");

    notesItem.innerHTML = `
        <div class="notes__item-check">
          <img src="/img/icons/checked.png" alt="checked" />
        </div>
        <div class="notes__descr">${item.note}</div>
        <div class="options">
          <span class="options__pencil"></span>
          <span class="options__trash"></span>
        </div>`;

    if (item.isChecked) {
      notesItem.classList.add("checked");
    }
    notes.appendChild(notesItem);
  });
}

function initListeners() {
  // Filter list
  filter.addEventListener("click", (e) => {
    console.log(e.target);
    filter.classList.toggle("open");
    // if (e.target !== filter) filter.classList.remove("open");
    // открывает/закрывает список
  });

  const items = filter.querySelectorAll(".filter__item");

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      filterSelected.textContent = item.textContent; // меняем выбранный текст
      // filter.classList.remove("open");
    });
  });

  // open Modal add note
  addBtn.addEventListener("click", () => {
    modalWrap.classList.add("modal__open");
  });

  // cancel Modal Add Note
  cancelBtn.addEventListener("click", () => {
    if (modalWrap.classList.contains("modal__open"))
      modalWrap.classList.remove("modal__open");
    modalInput.classList.remove("modal__input-error");
  });

  // add note
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

    renderNotes(notesObj);
  });

  // remove note
  notes.addEventListener("click", (e) => {
    let target = e.target;
    // console.log(target);
    if (target.classList.contains("options__trash")) {
      let str = target.closest(".notes__item");
      str = str.querySelector(".notes__descr").textContent;
      // console.log(str);
      let updatedObj = notesObj.filter((note) => note.note !== str);
      notesObj = updatedObj;
    }

    // check note
    if (
      target.classList.contains("notes__item-check") ||
      target.tagName === "IMG"
    ) {
      let str = target.closest(".notes__item");
      str = str.querySelector(".notes__descr").textContent;
      // console.log(str);

      notesObj.forEach((note) => {
        if (note.note === str) {
          note.isChecked = !note.isChecked; // toggle checked state
        }
      });
    }

    renderNotes(notesObj);
  });

  // search note

  searchInput.addEventListener("input", (e) => {
    let value = e.target.value.toLowerCase();
    console.log(value);
    if (value === "") {
      renderNotes(notesObj);
      return;
    }
    let filteredNotes = notesObj.filter((note) =>
      note.note.toLowerCase().includes(value)
    );
    console.log(filteredNotes);
    renderNotes(filteredNotes);
  });
}

// function init
renderNotes(notesObj);

initListeners();
