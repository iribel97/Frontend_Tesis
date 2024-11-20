import { Routes } from '@angular/router';
import {PageRegisterComponent} from "./pages/page-register/page-register.component";
import {PageLoginComponent} from "./pages/page-login/page-login.component";
import { PrincipalComponent} from "./templates/principal/principal.component";
import {HomeComponent} from "./pages/home/home.component";

export const routes: Routes = [
    {
    path: '',
    component: PrincipalComponent,
    children: [
        {path: 'home', component: HomeComponent},
    ]},
    {path: '', component: PageRegisterComponent},
    {path: 'register', component: PageRegisterComponent},
    {path: 'login', component: PageLoginComponent},

];
