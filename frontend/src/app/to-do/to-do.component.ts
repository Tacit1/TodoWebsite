import { Component, OnInit } from '@angular/core';
import {Todo} from "../shared/todo.model";
import {TodoService} from "../shared/todo.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  todos!: Todo[]

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos()
  }
  onFormSubmit(form: NgForm) {
    if (form.invalid) return alert ("Input can't be empty");
    console.log(form);

    this.todoService.addTodo(new Todo (form.value.text));
  }
}
