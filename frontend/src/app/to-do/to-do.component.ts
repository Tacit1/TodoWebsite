import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../shared/todo.model";
import {TodoService} from "../shared/todo.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  todos!: Todo[];
  @Input() todo!: Todo;
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos()
  }
  onFormSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) return alert ("Input can't be empty");
    this.todoService.addTodo(new Todo (form.value.text));
    form.reset();
  }
  onDeleteClicked() {
    this.deleteClicked.emit()
  }
  deleteTodo(todo:Todo){
    const index = this.todos.indexOf(todo);
    this.todoService.deleteTodo(index);
  }
}
