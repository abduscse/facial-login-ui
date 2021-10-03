import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = 'localhost:3000/';
  constructor(private http: HttpClient) { }

  registerUser(email, image) {
    const url = this.baseUrl + 'login?email=' + email;
    return this.http.post(url, image);
  }
  loginUser() {

  }
}
