import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

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
        password: [null, [Validators.required, Validators.minLength(4)]],
        passwordConfirm: [null, [Validators.required, Validators.minLength(4)]],
      },
      {
        //validators : CustomValidators.passwordMatches
      }
    );
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    console.log(this.registerForm.value);
    this.authService
      .register(this.registerForm)
      .pipe(map((user) => this.router.navigate(['login'])))
      .subscribe();
  }
}
