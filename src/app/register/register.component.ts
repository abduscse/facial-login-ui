import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
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
export class RegisterComponent implements OnInit {
  imageUrl: any;
  registerMethod = 'camera';
  loginMethod = 'camera';
  isRegisterRoute: boolean;
  isLoginRoute: boolean;
  email = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  user: User = new User();
  constructor(private ref: ChangeDetectorRef, public router: Router, private appService: AppService) {
    this.isRegisterRoute = router.url.split('/')[1] === 'register';
    this.isLoginRoute = router.url.split('/')[1] === 'login';
  }
  ngOnInit(): void { }
  getCapturedImage(data: any) {
    this.imageUrl = data;
    this.ref.detectChanges();
  }
  register() {
    this.user.email = this.email.value;
    this.user.imageURL = this.imageUrl;

    this.appService.registerUser(this.user.email, this.user.imageURL).subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
  }
  login() {
    this.user.email = this.email.value;
    this.user.imageURL = this.imageUrl;
  }
}
