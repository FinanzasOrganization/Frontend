import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) { }

  getToken(){
    return localStorage.getItem('token');

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getUserRoles(): string {
    const role = localStorage.getItem('role');
    console.log('role:', role);
    // Manejar el caso en que el token es nulo
    if (!role) {
      console.log("no hay role")
      return "";
    }
    return role;
  }
}
