import { Component, Input, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students/students.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'form-chang-pass',
  imports: [ReactiveFormsModule,],
  templateUrl: './form-chang-pass.component.html',
  styleUrl: './form-chang-pass.component.css'
})
export class FormChangPassComponent implements OnInit {
  @Input() cedula!: string;  

  formChangePassword!: FormGroup;
  sendform = false;

  constructor(private studentsService: StudentsService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.formChangePassword = this.fb.group({
      contrasena: ['', Validators.required],
      contrasenaNueva: ['', Validators.required]
    });
  }

  onSubmit(): void { 
    if (this.formChangePassword.valid) {
      const payload = {
        cedula: this.cedula,
        contrasena: this.formChangePassword.value.contrasena,
        contrasenaNueva: this.formChangePassword.value.contrasenaNueva
      };

      this.studentsService.changePassword(payload).subscribe({
        next: (response: any) => {
          if (!response.error) {
            // Handle success
            this.authService.logout();
            window.location.href = '/';
          }
        },
        error: (error) => {
          console.error('Error al cambiar la contraseña', error);
        }
      });
    }
  }

}
