import { $ } from './helpers.js'

import { todo, inProgress, done } from './data.js'

import { taskItem, getRightTimeFormat } from './objectStructure.js'

import { renderTask, renderDropList, renderInProgress, renderDone, deleteTask } from './compositions.js'

async function handleDomLoaded () {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  renderDropList(data)
}

function handleDOMLoadedClock() {
  const hoursClockElement = $('.header__time-hours')
  const minutsClockElement = $('.header__time-minuts')

  setInterval(() => {
    const time = new Date()
    const hours = time.getHours()
    const minuts = time.getMinutes()

    hoursClockElement.innerHTML = getRightTimeFormat(hours)
    minutsClockElement.innerHTML = getRightTimeFormat(minuts)
  }, 500)
}

function handleShowInputForm () {
  const formPopUpWindowElement = $('#formWindow')
  formPopUpWindowElement.classList.remove('vision')
}

function handleCloseInputWindow () {
  const formPopUpWindowElement = $('#formWindow')
  const formPopUpEditWindowElement = $('#editForm')
  formPopUpWindowElement.classList.add('vision')
  formPopUpEditWindowElement.classList.add('vision')
}

function handleBeforeUnload () {
  const json = JSON.stringify(todo)
  localStorage.setItem('task', json)

  const inProgressJson = JSON.stringify(inProgress)
  localStorage.setItem('inprogress', inProgressJson)

  const doneJson = JSON.stringify(done)
  localStorage.setItem('done', doneJson)
}

function handleSubmit (event) {
  const selectElement = $('#selectUser1')
  const inputTitleElement = $('#title')
  const inputDescriptionElement = $('#description')
  const formInputElement = $('#formInput')
  const importanceSelectElement = $('#typeImportant')

  event.preventDefault()
  const title = inputTitleElement.value
  const description = inputDescriptionElement.value
  const selectedValue = selectElement.options[selectElement.selectedIndex].value
  const importanceValue = importanceSelectElement.options[importanceSelectElement.selectedIndex].text

  const todoTask = new taskItem (title, description, selectedValue, importanceValue)
  todo.push(todoTask)
  formInputElement.reset()
  renderTask(todo)
}

function handleButtonDelEditTask (event) {
  const target = event.target
  const role = target.dataset.role
  const todoListElement = target.closest('.todotask')
  const id = todoListElement.id
  if (role == 'remove') {
    deleteTask(id, todo, 'task')
    deleteTask(id, inProgress, 'inprogress')
    deleteTask(id, done, 'done')
    renderTask(todo)
    renderInProgress(inProgress)
    renderDone(done)
  }
  if (role == 'edit') {
    const editForm = document.querySelector('#editForm')
    editForm.classList.remove('vision')
    const inputTitleElement = $('#titleEdit')
    const inputDescriptionElement = $('#descriptionEdit')
    todo.forEach((element, index) => {
      if (element.id == id) {
        inputTitleElement.value = element.title
        inputDescriptionElement.value = element.description
      }
    })
    editForm.onclick = function () {
      todo.forEach((item) => {
        if (item.id == id) {
          item.title = inputTitleElement.value
          item.description = inputDescriptionElement.value
        }
      })
    }
    renderTask(todo)
  }
}

function handleChangeTaskCondition (event) {
  const select = document.querySelector('#typeList')
  const target = event.target
  const todoElement = target.closest('.todotask')
  const id = todoElement.id

  if (select.value == 2 && inProgress.length >= 3) {
    alert('не возможно выполнить')
    return 0
  }
  if (select.value == '2') {
    todo.forEach((element, index) => {
      if (element.id == id) {
        todo.splice(index, 1)
        inProgress.push(element)

        renderTask(todo)
        renderInProgress(inProgress)
        renderDone(done)
      }
    })
  } else if (select.value == '3') {
    todo.forEach((element, index) => {
      if (element.id == id) {
        todo.splice(index, 1)
        done.push(element)

        renderTask(todo)
        renderInProgress(inProgress)
        renderDone(done)
      }
    })
  }
  if (select.value == '1') {
    inProgress.forEach((element, index) => {
      if (element.id == id) {
        inProgress.splice(index, 1)
        todo.push(element)
        renderTask(todo)
        renderInProgress(inProgress)
        renderDone(done)
      }
    })
  } else if (select.value == '3') {
    inProgress.forEach((element, index) => {
      if (element.id == id) {
        inProgress.splice(index, 1)
        done.push(element)
        renderTask(todo)
        renderInProgress(inProgress)
        renderDone(done)
      }
    })
  }
}

function handleClearAll () {
  const myModal = new bootstrap.Modal(document.getElementById('myModal'))
  myModal.show()
  return 0
}
function handleDeleteAll() {
  done.length = 0
  renderDone(done)
}

function handleSortTasks (event) {
  event.preventDefault()
  const serchElement = document.querySelector('#search')
  const { value: valueSearch } = serchElement

  const select = document.querySelector('.sortSelect')
  const { value: valueSort } = select

  let resultTodo = localStorage.task ? JSON.parse(localStorage.getItem('task')) : []
  resultTodo = resultTodo.filter((item) => item.title.includes(valueSearch))

  if (valueSort == '1') {
    resultTodo = resultTodo.sort((prev, next) => {
      const prevTime = prev.id
      const nextTime = next.id
      return nextTime - prevTime
    })
  }
  if (valueSort == '2') {
    resultTodo = resultTodo.sort((prev, next) => {
      const prevTime = prev.id
      const nextTime = next.id
      return prevTime - nextTime
    })
  }
  if (valueSort == '3') {
    resultTodo = resultTodo.sort((prev, next) => {
      if (next.user < prev.user) {
        return 1
      } else {
        return -1
      }
    })
  }
  if (valueSort == '4') {
    renderTask(todo)
  }
  renderTask(resultTodo)
}

export {
  handleShowInputForm,
  handleCloseInputWindow, handleSubmit,
  handleBeforeUnload,
  handleButtonDelEditTask,
  handleDomLoaded,
  handleChangeTaskCondition,
  handleClearAll,
  handleDOMLoadedClock,
  handleSortTasks,
  handleDeleteAll
}
