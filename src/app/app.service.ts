import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  private menuID = new BehaviorSubject<any>(null);
  menuID$ = this.menuID.asObservable();

  private emailID = new BehaviorSubject<any>(null);
  emailID$ = this.emailID.asObservable();

  private logoutFlag = new BehaviorSubject<any>(null);
  logoutFlag$ = this.logoutFlag.asObservable();

  registerUser(email, imageFile): any {
    const url = this.baseUrl + 'register?email=' + email;
    return this.http.post(url, imageFile, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    });
  }
  loginUser(email, imageFile): any {
    const url = this.baseUrl + 'login?email=' + email;
    return this.http.post(url, imageFile, {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    });
  }
  sendMenuID(menuID: string): any {
    this.menuID.next(menuID);
  }
  sendEmailID(emailID: string): any {
    this.emailID.next(emailID);
  }
  sendLogoutFlag(logoutFlag: boolean): any {
    this.logoutFlag.next(logoutFlag);
  }
  getMenus(): Array<{ id: string, title: string, path: string, icon: string }> {
    return [
      { id: 'home', title: 'Home', path: '/home', icon: 'home' },
      { id: 'register', title: 'Register', path: '/register', icon: 'note_add' },
      { id: 'login', title: 'Login', path: '/login', icon: 'login' }
    ];
  }
}
