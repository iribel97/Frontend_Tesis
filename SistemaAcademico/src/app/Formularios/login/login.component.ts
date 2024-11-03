import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { LoginRequest } from '../../services/login/LoginRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  loginError: string = "";

  loginForm!: FormGroup;
  returnUrl!: string;
  isFormUpdating: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      cedula: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]], // Los validadores van en un array
      password: ['', Validators.required]
    });
  }

  get cedula() { return this.loginForm.controls['cedula']; }
  get password() { return this.loginForm.controls['password']; }

  onSubmit() {
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData.message || 'Error en el inicio de sesión'; // Revisión para mostrar un mensaje amigable
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

}
