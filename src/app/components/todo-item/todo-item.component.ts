import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter(); 
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  // set dynamic classes
  setClasses() {
    let classes = {
      todo: true,
      'is-completed': (this.todo.completed ? true : false)
    }
    return classes;
  }

  toggleCheckbox(todo: Todo){
    todo.completed = !todo.completed;
    this.todoService.toggleCompleted(todo).subscribe( todo => console.log(todo));
  }

  onDelete(todo: Todo){
    this.deleteTodo.emit(todo)  }
}
