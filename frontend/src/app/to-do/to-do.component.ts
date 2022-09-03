import {Component, OnInit} from '@angular/core';
import { TodoService } from '../services/todo/todo.service';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  todos: any = [];

  constructor(
    private todoService: TodoService
    ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(){
    this.todoService.getByUser(localStorage.getItem('id')).subscribe((response: any) => {
      console.log('todo response', response);
      this.todos = response;
    }, err => {
      console.log('error getting todos', err);
    })
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) return alert ("Input can't be empty");
    this.todoService.create({completed: false, userId: localStorage.getItem('id'), ...form.value}).subscribe(response => {
        console.log("response", response);
        this.getTodos();
    }, err => {
      console.log("error creating todo", err);
      alert("Error creating Todo");
    });
    form.reset();
  }
  deleteTodo(todoId:any){
    this.todoService.delete(todoId).subscribe(response => {
      console.log("delete response", response);
      this.getTodos();
    }, err => {
      console.log('error deleting the todo');
      alert("error deleting todo");
    })
  }

  todoStatusChange(event: any, id: any){
      console.log(id);
      this.todoService.update(id, {completed: event.target.checked}).subscribe(response => {
        console.log("response", response);
      }, err => {
        console.log("error updating status for todo", err);
        alert("problem updating status")
      })
  }
}
