import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth-service/authentication.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

class CustomValidators {
  static passwordContainsNumber(
    control: AbstractControl
  ): ValidationErrors | null {
    const regex = /\d/;

    if (regex.test(control.value) && control.value !== null) {
      return null;
    } else {
      return { passwordInvalid: true };
    }
  }

  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    if (password && password === passwordConfirm) {
      return null;
    } else {
      return { passwordNotMatching: true };
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [
          null,
          [Validators.email, Validators.required, Validators.minLength(6)],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(4),
            CustomValidators.passwordContainsNumber,
          ],
        ],
        passwordConfirm: [
          null,
          [
            Validators.required,
            Validators.minLength(4),
            CustomValidators.passwordContainsNumber,
          ],
        ],
      },
      {
        validators: CustomValidators.passwordsMatch,
      }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    console.log(this.registerForm.value);
    this.authService
      .register(this.registerForm.value)
      .pipe(map((user) => this.router.navigate(['login'])))
      .subscribe();
  }
}
