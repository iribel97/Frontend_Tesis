import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginModule } from '../login.module';
import { RouterLink } from '@angular/router';
import { LoginService } from '../login.service';
import { Login } from '../login';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    LoginModule,
    RouterLink
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{

  constructor(private loginService: LoginService){}

  usu:Login[] = [];

  ngOnInit(): void {
    
  }
}
