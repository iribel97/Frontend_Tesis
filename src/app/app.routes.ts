import {Routes} from '@angular/router';
import {PageRegisterComponent} from "./pages/page-register/page-register.component";
import {PageLoginComponent} from "./pages/page-login/page-login.component";
import {PrincipalComponent} from "./templates/principal/principal.component";
import {HomeComponent} from "./pages/home/home.component";
import {UsersComponent} from "./pages/admin/users/users.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: PrincipalComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'admin/users', component: UsersComponent},
        ]
    },
    {path: 'register', component: PageRegisterComponent},
    {path: 'login', component: PageLoginComponent},

];
