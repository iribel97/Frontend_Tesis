import { Component } from '@angular/core';
import {FormRegisterComponent} from "../../forms/form-register/form-register.component";
import {TemplateAuthComponent} from "../../templates/template-auth/template-auth.component";

@Component({
  selector: 'app-page-register',
  standalone: true,
  imports: [
    FormRegisterComponent,
    TemplateAuthComponent
  ],
  templateUrl: './page-register.component.html',
  styleUrl: './page-register.component.css'
})
export class PageRegisterComponent {

}
