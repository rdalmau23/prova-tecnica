import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users$ = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers() {
  this.http.get<User[]>('assets/users.json').subscribe((users: User[]) => {
    this.users$.next(users);
  });
}

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  getUserById(id: string): User | undefined {
    return this.users$.value.find(u => u.id === id);
  }
}

