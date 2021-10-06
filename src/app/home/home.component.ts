import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from './../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  emailID: string;
  header = 'Welcome to Facial Recognition Home Page.';
  isLogOut = false;
  subscriptions: Subscription[] = [];
  constructor(private appService: AppService) { }
  ngOnInit(): void {
    const subscription = this.appService.emailID$.subscribe((emailID: string) => {
      this.emailID = emailID;
    });
    this.subscriptions.push(subscription);
  }
  logout(): void {
    this.isLogOut = true;
    this.appService.sendLogoutFlag(this.isLogOut);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
