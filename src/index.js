import './estilos.css';
import { Todo, TodoList, crearTodoHTML } from './classes';
import { contadorPendientes } from './js/componentes';
export const todoList = new TodoList();


todoList.todos.forEach( todo => crearTodoHTML( todo ))

//Asignar el contador de tareas pendientes

export const asignarContadorTodos = (arr = todoList.todos) => {

    let noCompletados = arr.filter(todo => !todo.completado);
    contadorPendientes.textContent = noCompletados.length;
}

asignarContadorTodos();

