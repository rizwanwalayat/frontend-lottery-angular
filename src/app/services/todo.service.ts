import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = environment.baseUrl;
  todosUrl:string = this.baseUrl+'/todos';
  limitUrl: string = '?_limit=5';
  constructor(private http:HttpClient, private jwtModule: JwtModule) {}

  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.todosUrl);
  }

  toggleCompleted(todo: Todo):Observable<any>{
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.put(url, todo, httpOptions);
  }

  deleteTodo(todo: Todo):Observable<Todo>{
    const url = `${this.todosUrl}/${todo.id}`
    return this.http.delete<Todo>(url, httpOptions);
  }

  addTodo(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.todosUrl, todo);
  }

}
