
// array para los items de la lista
let todoItems = [];

function renderTodo(todo){
    // seteamos en el localStorage
    localStorage.setItem("todoItems", JSON.stringify(todoItems));

    // seleccion del primer elemento con la clase js-todo-list
    const list = document.querySelector(".js-todo-list");

    const item = document.querySelector(`[data-key='${todo.id}']`);

    if (todo.deleted) {
        item.remove();
        return
      }

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
    if (item) {
        list.replaceChild(node, item);
      } else {
        list.append(node);
      }
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

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
  }



  function deleteTodo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
      deleted: true,
      ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
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


const list = document.querySelector(".js-todo-list");
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

// cuando carga la pagina, obtenemos el valor que hay en el localStorage de "todoItemsRef", y lo asignamos a REF. Si existe, convertimos el string JSON de vuelta al array original y lo alojamos en todoItems.
document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItems');
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }
  });
