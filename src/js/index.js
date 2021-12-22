window.addEventListener("DOMContentLoaded", () => {
  const formHight = document.querySelector(".todo__high form");
  const formHightInput = document.querySelector(".todo__high .todo__form-input");
  const formHightList = document.querySelector(".todo__high .todo__task-list ");
  const formLow = document.querySelector(".todo__low form");
  const formLowInput = document.querySelector(".todo__low .todo__form-input");
  const formLowList = document.querySelector(".todo__low .todo__task-list ");

  formHight.addEventListener("submit", addTaskToList);
  formLow.addEventListener("submit", addTaskToList);

  function addTaskToList(e) {
    e.preventDefault();
    if (e.target.closest(".todo__high")) {
      createTaskView(formHightInput.value, formHightList);
      formHight.reset();
    } else 
    if (e.target.closest(".todo__low")) {
      createTaskView(formLowInput.value, formLowList);
      formLow.reset();
    }
  }
  function createTaskView(task, target) {
    const taskHtml = `<li class="todo__task task">
                        <button class="task__status"></button>
                        <p class="task__text">${task}</p>
                      <button class="task__close-btn">+</button> `;
    target.insertAdjacentHTML("afterbegin", taskHtml);
  }
// task
  const todo = document.querySelector(".todo");
  todo.addEventListener("click", (e) => {
    if( e.target.closest(".task__close-btn") ) {
      closeTask(e)
    } else
    if( e.target.closest(".task__status") ) {
      changeTaskStatus(e)
    }
    
  })
  function closeTask(e) {
    e.target.closest(".task").remove();
  }
  function changeTaskStatus(e) {
    e.target.closest(".task").classList.toggle("task--checked")
  }
});
