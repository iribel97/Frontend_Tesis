import { Component } from '@angular/core';
import {FormRegisterComponent} from "../../forms/form-register/form-register.component";
import {TemplateAuthComponent} from "../../templates/template-auth/template-auth.component";

@Component({
  selector: 'app-page-login',
  standalone: true,
    imports: [
        FormRegisterComponent,
        TemplateAuthComponent
    ],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css'
})
export class PageLoginComponent {

}
