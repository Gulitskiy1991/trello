function taskItem (title, description, name, priority) {
  this.title = title
  this.description = description
  this.name = name
  this.priority = priority
  this.timeCreated = getDateInfo()
  this.id = id.generateID()
}

const id = {
  id: 0,
  generateID () {
    return ++this.id
  }
}

function getRightTimeFormat (time) {
  return (time > 9) ? time : ('0' + time)
}

function getDateInfo () {
  const timeCreated = new Date()
  const hours = timeCreated.getHours()
  const minutes = getRightTimeFormat(timeCreated.getMinutes())
  const day = getRightTimeFormat(timeCreated.getDate())
  const month = getRightTimeFormat(timeCreated.getMonth() + 1)
  const year = timeCreated.getFullYear()

  return `${hours}:${minutes}  ${day}.${month}.${year}`
}

export { taskItem, getRightTimeFormat }
