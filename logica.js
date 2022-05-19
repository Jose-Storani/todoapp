
// array para los items de la lista
let todoItems = [];

function renderTodo(todo){
    // seleccion del primer elemento con la clase js-todo-list
    const list = document.querySelector(".js-todo-list");

    // operador ternario para ver si la tarea, está chequeada
    // si es true, le asignas el valor done a isChecked, de otra forma, string vacio
    const isChecked = todo.checked ? "done" : "";

    // creamos un elemento y lo asignamos al nodo
    const node = document.createElement("li");

    // le asigno el atributo de class

    node.setAttribute("class", `todo-item ${isChecked}`);

// asigno el atributo data-key al id de todo

    node.setAttribute("data-key", todo.id);

    // establezco el contenido del li creado anteriormente
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for = "${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">Borrar</button>
    `;

    // agregamos el elemento al ultimo agregado
    list.append(node);

}


// funcion para crear un objeto y pushearlo dentro del array de la lista
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
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


