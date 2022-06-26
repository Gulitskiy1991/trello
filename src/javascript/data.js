const todo = localStorage.task ? JSON.parse(localStorage.getItem('task')) : []
const inProgress = localStorage.inprogress ? JSON.parse(localStorage.getItem('inprogress')) : []
const done = localStorage.done ? JSON.parse(localStorage.getItem('done')) : []

export { todo, inProgress, done }
