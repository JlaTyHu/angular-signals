import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly #userSignal = signal<User | null>(null);
  readonly user = this.#userSignal.asReadonly();
  readonly isLoggedIn = computed(() => !!this.user());

  readonly #http = inject(HttpClient);
  readonly #router = inject(Router);

  constructor() {
    this.#loadUserFromStorage();

    effect(() => {
      const user = this.user();

      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    });
  }

  #loadUserFromStorage() {
    const json = localStorage.getItem(USER_STORAGE_KEY);

    if (json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
    } else {
      this.#userSignal.set(null);
    }
  }

  async login(email: string, password: string): Promise<User> {
    const login$ = this.#http.post<User>(`${environment.apiRoot}/login`, {
      email,
      password
    });
    const user = await firstValueFrom(login$);
    this.#userSignal.set(user);
    return user;
  }

  async logout() {
    this.#userSignal.set(null);
    await this.#router.navigateByUrl('/login');
  }
}
