import { Component } from '@angular/core';
import {RegisterComponent} from "../../forms/register/register.component";
import {BackgraundComponent} from "../../shared/ui/backgraund/backgraund.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RegisterComponent,
    BackgraundComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
