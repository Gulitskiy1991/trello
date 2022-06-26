function templateUserList (data) {
  return `<option>${data.username}<option>`
}

function templateTask ({ title, description, name, timeCreated, id, priority }) {
  return `
    <div class="todotask" id="${id}">
      <div class="labels">
        <label>${title}</label>
        <label>${description}</label>
        <label>${priority}</label>
        <label></label>
      </div>
      <div style="display:flex">
        <button type="button" class="btn btn-success btn-form" id="btnEdit" data-role="edit" style="font-size: 15px">Edit</button>
        <button type="button" class="btn btn-danger btn-form" id="btnDelite" data-role="remove" style="font-size: 15px">Delete</button>
        <select id="typeList" class="select-priority">
          <option value="0" selected>Choise</option>
          <option value="1">TODO</option>
          <option value="2">INPROGRESS</option>
          <option value="3">DONE</option>
        </select>
      </div>
      <div>
        <label>${name}</label>
        <div class="block__todo-time">${timeCreated}</div>
      </div>
    </div>
    `
}

function templateEditWindow (list = {}) {
  return `
    <div class="addpopup vision" id="formWindow">
      <form class="formpopup" id="formInput">
          <input type="text" placeholder="Title" id="title" value="${list.title}">
          <input type="text" placeholder="Description" id="description" value="${list.description}">
          <div class="btns">
              <select id="selectUser">
                  <option selected>Name</option>
              </select>
              <button type="button" id="btnCancel">Cancel</button>
              <button type="submit" id="btnFormConfirm">Confirm</button>
          </div>
      </form>
    </div>
  `
}

export { templateUserList, templateTask, templateEditWindow }
