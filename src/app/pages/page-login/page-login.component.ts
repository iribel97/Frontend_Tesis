import {Component} from '@angular/core';
import {TemplateAuthComponent} from "../../templates/template-auth/template-auth.component";
import {FormLoginComponent} from "../../forms/form-login/form-login.component";
import {Router} from '@angular/router';

@Component({
    selector: 'app-page-login',
    imports: [
        TemplateAuthComponent,
        FormLoginComponent,
    ],
    templateUrl: './page-login.component.html',
    styleUrl: './page-login.component.css'
})
export class PageLoginComponent {
    constructor(private router: Router) {
    }

    navigateToRegister() {
        this.router.navigate(['/register']);
    }
}
