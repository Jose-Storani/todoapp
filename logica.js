
// array para los items de la lista
let todoItems = [];


// funcion para crear un objeto y pushearlo dentro del array de la lista
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  console.log(todoItems);
}


const form = document.querySelector('.js-form');

form.addEventListener('submit', event => {
    // para evitar que tire refresh cada vez que apreto
  event.preventDefault();
//   almaceno en input 
  const input = document.querySelector('.js-todo-input');

    // obtengo el valor del input y remuevo los espacios en blanco.
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});


