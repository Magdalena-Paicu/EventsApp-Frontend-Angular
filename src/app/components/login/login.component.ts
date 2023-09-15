import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth-services/auth.service';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { UsersService } from 'src/app/services/users/users.service';
import { UserStoreService } from 'src/app/services/user-store/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
    private dialog: DialogService,
    private userStore: UserStoreService,
    private userService: UsersService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  buttonEnabled: boolean = false;
  loginForm: FormGroup;
  password: string = '';
  email: string = '';
  showPassword: boolean = false;
  allUsers: User[] = this.authService.users;
  messageResponse: string;

  showPasswordPath = {
    show: '../assets/icons/show password.svg',
    hide: '../assets/icons/hide password.svg',
  };

  isPasswordEmpty: boolean = true;
  isEmailEmpty: boolean = true;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  setButtonEnabled($event) {
    this.buttonEnabled = $event.buttonEnabled;
  }

  onSubmit() {
    if (this.authService.login(this.email, this.password)) {
      console.log('Autentificare reusita!');
      this.router.navigate(['home-page']);
    } else {
      console.log('Authentificare esuata!');
    }
  }

  canSetButtonEnabled() {
    if (
      !this.loginForm.get('email').hasError('email') &&
      !this.loginForm.get('password').hasError('minlength')
    ) {
      if (!this.isEmailEmpty && !this.isPasswordEmpty) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  hasInputChanged(inputName) {
    if (inputName === 'password') {
      if (this.password === '') {
        this.isPasswordEmpty = true;
      } else {
        this.isPasswordEmpty = false;
      }
    } else if (inputName === 'email') {
      if (this.email === '') {
        this.isEmailEmpty = true;
      } else {
        this.isEmailEmpty = false;
      }
    }

    this.buttonEnabled = this.canSetButtonEnabled();
  }

  clickShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.usersService.authenticatedLogin(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['/home-page']);
        this.usersService.storeToken(response.token);
        let tokenPayload = this.userService.decodedToken();
        this.userStore.setMailFromStore(tokenPayload.email);
        this.userStore.setRoleFromStore(tokenPayload.role);
      },
      (error) => {
        this.openSnackBar(error.error.message);
      }
    );
  }

  openForgetDialog() {
    this.dialog.openForgetPasswordDialog();
  }

  openSnackBar(message: string) {}

  ngOnInit(): void {}
}
