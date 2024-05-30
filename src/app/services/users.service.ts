import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import type { User, UserResponse, UsersResponse } from '@interfaces/req-res';
import { delay, map } from 'rxjs';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  #state = signal<State>({
    users: [],
    loading: true,
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  constructor() {
    console.log('UsersService created');

    this.http.get<UsersResponse>('https://reqres.in/api/users')
      .pipe(delay(2000))
      .subscribe(response => {
        this.#state.set({
          users: response.data,
          loading: false,
        });
      });
  }

  getUserById(id: string) {
    return this.http.get<UserResponse>(`https://reqres.in/api/users/${id}`)
      .pipe(
        delay(2000),
        map(response => response.data)
      )
  }

}
