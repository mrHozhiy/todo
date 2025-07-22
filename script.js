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

const generateId = () =>
  Date.now().toString() + Math.random().toString(36).substring(2);

const saveNotesToLocalStorage = (notesObj) => {
  localStorage.setItem("notes", JSON.stringify(notesObj));
};

const loadNotesFromLocalStorage = (key) => {
  const notesFromStorage = localStorage.getItem(key);
  return notesFromStorage ? JSON.parse(notesFromStorage) : null;
};

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark_theme");
} else {
  document.body.classList.remove("dark_theme");
}

let notesObj = loadNotesFromLocalStorage("notes") || [
  { id: generateId(), note: "note 1", isChecked: true },
  { id: generateId(), note: "note 2", isChecked: false },
  { id: generateId(), note: "note 3", isChecked: true },
  { id: generateId(), note: "note 4", isChecked: false },
  { id: generateId(), note: "new note", isChecked: true },
];

// functions

function renderNotes(arrayObjs) {
  // Filter notes based on selected category
  let filteredNotes = arrayObjs.filter((item) => {
    const filterText = filterSelected.textContent;
    if (filterText === "Completed") {
      return item.isChecked === true;
    } else if (filterText === "Incomplete") {
      return item.isChecked === false;
    } else {
      return item;
    }
  });

  if (filteredNotes.length === 0) {
    notes.innerHTML = "";

    let imgUrl = document.body.classList.contains("dark_theme")
      ? "/img/Detective-check-footprint-dark.png"
      : "/img/Detective-check-footprint.png";

    let notesItem = document.createElement("li");
    notesItem.classList.add("notes__empty");
    notesItem.innerHTML = `
          <img src="${imgUrl}" alt="empty" />
          <h3 title title__empty>Empty...</h3>`;
    console.log("empty");
    notes.appendChild(notesItem);
    return;
  }

  notes.innerHTML = "";
  filteredNotes.forEach((item) => {
    // const item = arrayObjs[arrayObjs.length - 1];
    const notesItem = document.createElement("li");
    notesItem.classList.add("notes__item");
    notesItem.setAttribute("data-id", item.id);

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

function saveEdit(id, newValue) {
  if (newValue.trim() === "") return;

  notesObj = notesObj.map((note) =>
    note.id === id ? { ...note, note: newValue } : note
  );

  saveNotesToLocalStorage(notesObj);
  // renderNotes(notesObj);
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
      renderNotes(notesObj); // перерисовываем заметки
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
    const newNote = { id: generateId(), note: value, isChecked: false };
    notesObj.push(newNote);
    saveNotesToLocalStorage(notesObj);

    modalWrap.classList.remove("modal__open");
    modalInput.classList.remove("modal__input-error");
    modalInput.value = "";

    console.log(notesObj);

    renderNotes(notesObj);
  });

  notes.addEventListener("click", (e) => {
    let target = e.target;
    const noteElement = target.closest(".notes__item");
    const noteId = noteElement.getAttribute("data-id");
    const noteTextEl = noteElement.querySelector(".notes__descr");
    const originalText = noteTextEl.textContent;

    if (target.classList.contains("options__pencil")) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = originalText;
      input.classList.add("edit-note-input");
      input.style.width = "80%";

      let isEdited = false;
      console.log(input);
      noteTextEl.replaceWith(input);
      input.focus();

      // save on Enter key
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          saveEdit(noteId, input.value);

          isEdited = true;
          input.blur();

          renderNotes(notesObj);
        }
        // cancel edit on Escape key
        if (e.key === "Escape") {
          isEdited = true;
          input.blur();
          renderNotes(notesObj);
        }
      });

      // save out of focus
      input.addEventListener("blur", () => {
        if (!isEdited) {
          saveEdit(noteId, input.value);
          renderNotes(notesObj);
        }
      });
    }

    // remove note
    if (target.classList.contains("options__trash")) {
      let updatedObj = notesObj.filter((note) => note.id !== noteId);

      notesObj = updatedObj;

      saveNotesToLocalStorage(notesObj);
      renderNotes(notesObj);
    }

    // check note
    if (target.closest(".notes__item-check")) {
      notesObj = notesObj.map((note) =>
        note.id === noteId ? { ...note, isChecked: !note.isChecked } : note
      );

      saveNotesToLocalStorage(notesObj);
      renderNotes(notesObj);
    }
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

  // change theme

  const btnSwitchTheme = document.querySelector(".btn-switch-theme");

  btnSwitchTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark_theme");
    const isDarkTheme = document.body.classList.contains("dark_theme");

    // Save theme preference to localStorage
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
  });
}

// function init
renderNotes(notesObj);

initListeners();
