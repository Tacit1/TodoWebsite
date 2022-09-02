import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from './member';
import { Todo} from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  membersUrl = 'http://localhost:3000/members';
  todoUrl = 'http://localhost:3000/entries';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Member[]> {
    return this.http.get<Member[]>(this.membersUrl);
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl);
  }
}

