import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../shared/todo.model";
import {TodoService} from "../shared/todo.service";
import {NgForm} from "@angular/forms";
import {BackendService} from "../shared/backend.service";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  todos!: Todo[];
  @Input() todo!: Todo;
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();

  constructor(private todoService: TodoService, private backendService: BackendService) { }
  myObserver = {
    next: (x: Todo[]) => this.todos=x,
    error: (err: Error) => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  ngOnInit(): void {
    this.backendService.getAllTodos().subscribe(this.myObserver);
  }
  onFormSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) return alert ("Input can't be empty");
    this.todoService.addTodo(new Todo (form.value.text));       //change that to this.backendService otherwise its not working
    form.reset();
  }
  deleteTodo(todo:Todo){
    const index = this.todos.indexOf(todo);
    this.todoService.deleteTodo(index);                       //change that to backendService otherwise its not working
  }
}
