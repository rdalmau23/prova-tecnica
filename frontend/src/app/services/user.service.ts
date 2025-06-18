import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

const STORAGE_KEY = 'users';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.users$.next(JSON.parse(saved));
    } else {
      fetch('assets/users.json')
        .then(res => res.json())
        .then((data: User[]) => {
          this.users$.next(data);
          this.saveToLocalStorage(data);
        });
    }
  }

  private saveToLocalStorage(users: User[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  getUserById(id: string): User | undefined {
    return this.users$.value.find(u => u.id === id);
  }

  addUser(user: User) {
    const updated = [...this.users$.value, user];
    this.users$.next(updated);
    this.saveToLocalStorage(updated);
  }
}

