import {Component} from '@angular/core';
import {FormRegisterComponent} from "../../forms/form-register/form-register.component";
import {TemplateAuthComponent} from "../../templates/template-auth/template-auth.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-page-register',
    imports: [
        FormRegisterComponent,
        TemplateAuthComponent
    ],
    templateUrl: './page-register.component.html',
    styleUrl: './page-register.component.css'
})
export class PageRegisterComponent {

    constructor(private router: Router) {
    }

    navigateToLogin() {
        this.router.navigate(['/login']);
    }
}
