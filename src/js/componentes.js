import { todoList } from '../index.js';
import { Todo } from '../classes/todo.class.js';
import { asignarContadorTodos } from '../index.js';

//referencias al dom
const ulTodoHTML         = document.querySelector('.todo-list');
const txtInput           = document.querySelector('.new-todo');
const borrarCompletados  = document.querySelector('.clear-completed');
const ulFiltros          = document.querySelector('.filters'); 
const aFiltros           = document.querySelectorAll('a.filtro');
export let contadorPendientes = document.querySelector('.todo-count').firstChild;

//fUNCION PARA CREAR TODOS EN EL HTML
export const crearTodoHTML = (todo) => {

    const todoHTML = `
    <li class="${(todo.completado) ? "completed" : ""}" data-id="${todo.id}">
      <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado) ? "checked" : ""}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
      </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = todoHTML;
    ulTodoHTML.append(div.firstElementChild);
    return div.firstElementChild;

}


//EVENTOS
//Agregar a la lista los nuevos todos
txtInput.addEventListener('keyup', ( event ) => {
  
      if(event.keyCode === 13 && txtInput.value.length > 0){

        const inputTodo = new Todo(txtInput.value);
        todoList.nuevoTodo( inputTodo);
        crearTodoHTML(inputTodo);
        asignarContadorTodos();
        txtInput.value = "";                    
      }
})


//Manipular los TODOS existentes
ulTodoHTML.addEventListener('click', (event) => {

  const nombreElemento = event.target.localName; //input, label, button
  const todoElemento   = event.target.parentElement.parentElement;
  const todoId         = todoElemento.getAttribute('data-id');  
  

  if(nombreElemento.includes("input")){         //click en el check y Marcar como completado 
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed')
    //Modificar el contador de pendientes
    asignarContadorTodos();

  }else if(nombreElemento.includes("button")){  //Click en el boton borrar
    todoList.eliminarTodo(todoId);
    ulTodoHTML.removeChild(todoElemento)
    asignarContadorTodos();
  }
 
})


//Eliminar todos los TODOS completados
borrarCompletados.addEventListener("click", () => {
 

    todoList.eliminarCompletados();
    for(let i = ulTodoHTML.children.length-1; i >= 0; i--){
      const elemento = ulTodoHTML.children[i];
      
      if(elemento.className == "completed"){
        ulTodoHTML.removeChild(elemento);
      }

    }
   
});


//Botones Pendientes, Completados, Todos
ulFiltros.addEventListener('click', (event) =>{

 const filtro = event.target.text;
  if(!filtro) { return; }

  aFiltros.forEach(elem => elem.classList.remove('selected'));
  event.target.classList.add('selected');

  for( const elemento of ulTodoHTML.children ){

    elemento.classList.remove('hidden');
    const todoCompletado = elemento.classList.contains('completed');
    

    switch( filtro ){

      case 'Pendientes':
        if( todoCompletado ){
          elemento.classList.add('hidden');
      }
      break;

      case 'Completados':
        if( !todoCompletado ){
          elemento.classList.add('hidden');
      }
      break;

    }

    

  }

});

