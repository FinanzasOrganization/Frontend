import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private REGISTER_URL = 'http://localhost:8090/api/go-finance/v1/auth/signup';
  private LOGIN_URL = 'http://localhost:8090/api/go-finance/v1/auth/login';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router) { }

  register(name: string, lastname: string, email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.REGISTER_URL, {name, lastname, email, password});
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, {email, password}).pipe(
      tap(response => {
        if (response.access_token) {
          console.log(response.access_token)
          this.setToken(response.access_token);
        }
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
