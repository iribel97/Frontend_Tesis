import { Routes } from '@angular/router';
import {PageRegisterComponent} from "./pages/page-register/page-register.component";
import {PageLoginComponent} from "./pages/page-login/page-login.component";

export const routes: Routes = [
    {path: '', component: PageRegisterComponent},
    {path: 'register', component: PageRegisterComponent},
    {path: 'login', component: PageLoginComponent},

];
