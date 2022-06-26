import { $ } from './helpers.js'

import {
  handleShowInputForm,
  handleCloseInputWindow,
  handleSubmit,
  handleButtonDelEditTask,
  handleBeforeUnload,
  handleDomLoaded,
  handleChangeTaskCondition,
  handleClearAll,
  handleDOMLoadedClock,
  handleSortTasks,
  handleDeleteAll } from './handlers.js'

import { todo, inProgress, done } from './data.js'

import { renderTask, renderInProgress, renderDone } from './compositions.js'

const formInputElement = $('#formInput')

const listToDoElement = $('#list')
const listInPtogressElement = $('#list2')
const listDoneElement = $('#list3')

const btnAddElement = $('#btnAdd')
const btnCancelElement = $('#btnCancel')
const btnCancelEditFormElement = $('#btnCancelEditForm')
const btnDeleteAllElement = $('#deleteAll')
const btnClearAll = $('#clearAll')

const block1 = document.querySelector('#sectionTodo')

block1.addEventListener('change', handleSortTasks)

listToDoElement.addEventListener('click', handleChangeTaskCondition)
listInPtogressElement.addEventListener('click', handleChangeTaskCondition)
listDoneElement.addEventListener('click', handleChangeTaskCondition)

window.addEventListener('beforeunload', handleBeforeUnload)
document.addEventListener('DOMContentLoaded', handleDomLoaded)
document.addEventListener('DOMContentLoaded', handleDOMLoadedClock)

btnAddElement.addEventListener('click', handleShowInputForm)
btnCancelElement.addEventListener('click', handleCloseInputWindow)
btnCancelEditFormElement.addEventListener('click', handleCloseInputWindow)
btnDeleteAllElement.addEventListener('click', handleClearAll)
btnClearAll.addEventListener('click', handleDeleteAll)

listToDoElement.addEventListener('click', handleButtonDelEditTask)
listInPtogressElement.addEventListener('click', handleButtonDelEditTask)
listDoneElement.addEventListener('click', handleButtonDelEditTask)

formInputElement.addEventListener('submit', handleSubmit)

renderTask(todo)
renderInProgress(inProgress)
renderDone(done)
