import { Injectable } from '@angular/core';
import {Todo} from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [
  ];

  constructor() { }

  getAllTodos()
  {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  deleteTodo(index: number){
    this.todos.splice(index,1);
  }
}
