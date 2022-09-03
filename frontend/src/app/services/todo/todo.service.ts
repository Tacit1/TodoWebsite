import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }


  get(){
      return this.http.get(environment.API_URL + 'todos/');
  }

  getByUser(id: any){
    return this.http.get(environment.API_URL + `todos/user/${id}`)
  }

  create(todo: any){
    return this.http.post(environment.API_URL + 'todos/', todo);
  }

  delete(id: any){
    return this.http.delete(environment.API_URL + `todos/${id}`);
  }

  update(id: any, updatedTodo: any){
    return this.http.put(environment.API_URL + `todos/${id}`, updatedTodo);
  }
}
