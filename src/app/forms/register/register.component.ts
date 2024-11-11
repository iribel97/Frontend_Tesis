import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
