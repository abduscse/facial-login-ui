import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { User } from '../shared/model/user.types';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  menuID: string;
  registerMethod = 'camera';
  loginMethod = 'camera';
  isRegisterRoute: boolean;
  isLoginRoute: boolean;
  email = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  user: User = new User();
  action = 'Go To Home';
  snackBarConfig: MatSnackBarConfig = { duration: 2000, horizontalPosition: 'right' };
  subscriptions: Subscription[] = [];
  constructor(private ref: ChangeDetectorRef, public router: Router, private appService: AppService, private snackBar: MatSnackBar) {
    this.isRegisterRoute = router.url.split('/')[1] === 'register';
    this.isLoginRoute = router.url.split('/')[1] === 'login';
  }
  getCapturedImage($event: any): void {
    this.user.imageElement = $event;
    this.ref.detectChanges();
  }
  register(): void {
    this.user.email = this.email.value;
    if (this.user.email && this.user.imageElement) {
      this.snackBar.open('Registration successful!', this.action, this.snackBarConfig).afterDismissed().subscribe(() => {
        this.appService.sendEmailID(this.user.email);
      });
      const subscription = this.appService.registerUser(this.user.email, this.user.imageElement).subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      });
      this.subscriptions.push(subscription);
    }
  }
  login(): void {
    this.user.email = this.email.value;
    if (this.user.email && this.user.imageElement) {
      this.snackBar.open('Login successful!', this.action, this.snackBarConfig).afterDismissed().subscribe(() => {
        this.appService.sendEmailID(this.user.email);
      });
    }
  }
  navigateToLogin(): void {
    this.appService.sendMenuID('login');
    this.router.navigate(['login']);
  }
  navigateToRegister(): void {
    this.appService.sendMenuID('register');
    this.router.navigate(['register']);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
