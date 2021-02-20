const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
let id = todos.length;

LoadTODO();
class Todo{
  constructor(){
    this.id = id++;
    this.text = this.getText();
    this.check = false;
  }
  getText(){
    return prompt('Enter a todo task: ');
  }
}
if(todos.length !=0){
  render();
}


function newTodo() {

  const todo = new Todo();
  todos.push(todo);
  render();

}
function render(){
  list.innerHTML='';
  todos.map(renderTodo).forEach(todo => list.appendChild(todo))
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length;
  saveTODO();
}
function deleteTodo(id){
  todos = todos.filter(todo => todo.id !== id)
  render();
}

function renderTodo(todo){
  const li = document.createElement('li');
  li.innerHTML = `
  <input type="checkbox" onchange="changeTodo(${todo.id})" ${todo.check == true ? "checked" : ""}>
  <button onclick="deleteTodo(${todo.id})">delete</button>
  <span class="todo-text">${todo.text}</span>
  `
  id=todos.length;
  return li;
}

function changeTodo(id){
  todos = todos.map(todo => todo.id == id ? {...todo, check: !todo.check} : todo);
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length;
  saveTODO();
}

function saveTODO(){
  localStorage.clear();
  localStorage.lastList = JSON.stringify(todos);
}

function LoadTODO(){
  if(localStorage.length > 0){
    todos = JSON.parse(localStorage.lastList);
    render();
  }
}