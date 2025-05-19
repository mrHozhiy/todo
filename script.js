// Filter list in search
const filter = document.querySelector(".filter");
const filterList = document.querySelector(".filter__list");
const selected = filter.querySelector(".filter__selected");

// Filter category All completed active
const filterDoneWrap = document.querySelector(".filter-done__wrap");

// Tasks

const tasks = document.querySelector(".tasks");
const taskItem = document.querySelectorAll(".tasks__item");

// add task

const addInput = document.querySelector(".add__input");
const addBtn = document.querySelector(".add__btn");

// search

const searchInput = document.querySelector(".search__input");

const filterListArr = ["import", "urgent", "favor", "special"];
const filterListCategoryArr = ["all", "active", "completed"];
const tasksArr = ["task 1", "task 2", "task 3", "task 4"];

// let test = "";
function addTask() {
  // console.log(tasksArr);

  addBtn.addEventListener("click", () => {
    // test = addInput.value;
    // console.log(addInput.value);
    tasksArr.push(addInput.value);
    console.log(tasksArr);
    tasks.innerHTML = "";
    // createElement(ul);
    renderFilterList(tasks, "li", tasksArr, "tasks__item");
    renderTaskItem(tasksArr);
    addInput.value = "";
  });
}

function renderFilterList(parent, tag, arrList, className) {
  for (let i = 0; i < arrList.length; i++) {
    const item = document.createElement(tag);
    item.classList.add(className);
    // console.log(filterListArr[i]);
    item.textContent = arrList[i];
    parent.appendChild(item); // вставили в конец
    // console.log(item.textContent);
  }
}

function filterListFunc() {
  selected.addEventListener("click", () => {
    filter.classList.toggle("open"); // открывает/закрывает список
  });

  const items = filter.querySelectorAll(".filter__item");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      selected.textContent = item.textContent; // меняем выбранный текст
      filter.classList.remove("open"); // закрываем список
    });
  });
}

function filterListDoneFunc() {
  const filterDoneItem = document.querySelectorAll(".filter-done-item");
  filterDoneItem[0].classList.add("filter-done-item__active");
  // console.log(filterDoneItem);

  filterDoneWrap.addEventListener("click", (e) => {
    // console.log(e.target);
    filterDoneItem.forEach((item) => {
      item.classList.remove("filter-done-item__active");
    });
    e.target.classList.add("filter-done-item__active");
    // filter.classList.toggle("open"); // открывает/закрывает список
  });
}

function renderTaskItem(arrList) {
  const taskItem = document.querySelectorAll(".tasks__item");

  for (let i = 0; i < arrList.length; i++) {
    taskItem[i].innerHTML = `
    <div class="tasks__descr">${arrList[i]}</div>
    <div class="btns__wrap">
      <button>
        <i class="fi fi-rr-pencil tasks__btn-edit"></i>
      </button>
      <button>
        <i class="fi fi-rr-heart tasks__btn-favorite"></i>
      </button>
      <button>
        <i class="fi fi-rr-trash tasks__btn-trash"></i>
      </button>
    </div>`;
  }
}

function checkEmptyTasks(arr) {
  if (arr.length === 0) {
    tasks.innerHTML = `
    <div class="tasks__empty">
      <img src="/img/Detective-check-footprint.png" alt="empty" />
      <h3>Empty...</h3>
    </div>`;
  }
}

function removeTask() {
  tasks.addEventListener("click", (e) => {
    const target = e.target;

    // console.log(target.classList.contains("tasks__btn-trash"));

    if (target.classList.contains("tasks__btn-trash")) {
      const taskItem = target.closest(".tasks__item");
      const taskText = taskItem.querySelector(".tasks__descr").textContent;
      // Удаляем задачу из массива по значению
      const index = tasksArr.indexOf(taskText);
      if (index !== -1) {
        tasksArr.splice(index, 1); // удаляем из массива
      }
      tasks.innerHTML = "";
      renderFilterList(tasks, "li", tasksArr, "tasks__item");
      renderTaskItem(tasksArr);
      checkEmptyTasks(tasksArr);
    }
  });
}

function searchTask() {
  searchInput.addEventListener("input", () => {
    console.log(searchInput);
    let inputValue = searchInput.value.toLowerCase().trim();
    console.log(inputValue);

    const filteredTasks = tasksArr.filter((task) =>
      // task.toLowerCase().includes(inputValue) поиск по словам
      task.toLowerCase().startsWith(inputValue)
    );

    tasks.innerHTML = "";
    renderFilterList(tasks, "li", filteredTasks, "tasks__item");
    renderTaskItem(filteredTasks);
    checkEmptyTasks(filteredTasks);
  });
  // console.log(searchInput);
}

renderFilterList(filterList, "li", filterListArr, "filter__item");
renderFilterList(tasks, "li", tasksArr, "tasks__item");
renderTaskItem(tasksArr);
renderFilterList(
  filterDoneWrap,
  "li",
  filterListCategoryArr,
  "filter-done-item"
);
filterListFunc();
filterListDoneFunc();
addTask();
searchTask();
removeTask();
