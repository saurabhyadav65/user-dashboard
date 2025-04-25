import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private defaultUsers: User[] = [
    { name: 'saurabh', email: 'saurabh.y@example.com', role: 'Admin' },
    { name: 'ayush', email: 'ayush@example.com', role: 'Editor' },
    { name: 'ashish', email: 'ashish.ashish@example.com', role: 'Viewer' },
  ];

  private usersSubject = new BehaviorSubject<User[]>(this.defaultUsers);
  users$ = this.usersSubject.asObservable();

  constructor() {}

  addUser(user: User) {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }
}
