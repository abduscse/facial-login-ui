import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppService } from './../app.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit, AfterViewInit, OnDestroy {
  menus: Array<{ id: string, title: string, path: string, icon: string }> = [];
  menuID: string;
  subscriptions: Subscription[] = [];
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver, private appService: AppService, private router: Router) {
    this.menus = this.appService.getMenus().filter(menu => menu.id !== 'home');
    this.getMenuID();
  }
  ngOnInit(): void {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
  ngAfterViewInit(): void {
    const emailSubscription = this.appService.emailID$.subscribe((emailID: string) => {
      if (emailID) {
        this.menus = this.appService.getMenus();
        this.navigateToHome();
      }
    });
    const logoutSubscription = this.appService.logoutFlag$.subscribe((logoutFlag: string) => {
      if (logoutFlag) {
        this.menus = this.appService.getMenus().filter(menu => menu.id !== 'home');
        this.navigateToRegister();
      }
    });
    this.subscriptions.push(emailSubscription, logoutSubscription);

  }
  getMenuID(id?: any): void {
    const subscription = this.appService.menuID$.subscribe((data: string) => {
      this.menuID = data ? data : id ? id : 'register';
    });
    this.subscriptions.push(subscription);
  }
  navigateToHome(): void {
    this.appService.sendMenuID('home');
    this.router.navigate(['home']);
  }
  navigateToRegister(): void {
    this.appService.sendMenuID('register');
    this.router.navigate(['register']);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
