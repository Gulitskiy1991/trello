import { templateUserList, templateTask } from './templates.js'

import { $ } from './helpers.js'

function renderDropList (data) {
  const selectElement1 = $('#selectUser1')
  const selectElement2 = $('#selectUser2')
  let html = ''
  data.forEach((item) => {
    const optionElem = templateUserList(item)
    html += optionElem
  })
  selectElement1.innerHTML = html
  selectElement2.innerHTML = html
}

function renderTask (data) {
  const counterElement = $('.counterTodo')
  counterElement.innerHTML = data.length
  const list = document.querySelector('#list')
  let html = ''
  data.forEach((item) => {
    const listElem = templateTask(item)
    html += listElem
  })
  list.innerHTML = html
}

function renderInProgress (data) {
  const counterElement = $('.counterProgress')
  counterElement.innerHTML = data.length
  const listInPtogressElement = document.querySelector('#list2')
  let html = ''
  data.forEach((item) => {
    const listElem = templateTask(item)
    html += listElem
  })
  listInPtogressElement.innerHTML = html
}

function renderDone (data) {
  const counterElement = $('.counterDone')
  counterElement.innerHTML = data.length
  const listDoneElement = document.querySelector('#list3')
  let html = ''
  data.forEach((item) => {
    const listElem = templateTask(item)
    html += listElem
  })
  listDoneElement.innerHTML = html
}

const deleteTask = (id, array, name) => {
  const index = array.findIndex(task => task.id == id)
  if (index < 0) return
  array.splice(index, 1)
  localStorage.setItem(name, JSON.stringify(array))
}

export { renderDropList, renderTask, renderInProgress, renderDone, deleteTask }
