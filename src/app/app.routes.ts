import {Routes} from '@angular/router';
import {PageRegisterComponent} from "./pages/page-register/page-register.component";
import {PageLoginComponent} from "./pages/page-login/page-login.component";
import {PrincipalComponent} from "./templates/principal/principal.component";
import {HomeComponent} from "./pages/home/home.component";
import {UsersComponent} from "./pages/admin/users/users.component";
import {HomeCourseComponent} from "./pages/course/home-course/home-course.component";
import {loginGuard} from "./guard/login.guard";
import {authGuard} from "./guard/auth.guard";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: PrincipalComponent,
        canActivate: [authGuard],
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'admin/users', component: UsersComponent},
            {path: 'course', component: HomeCourseComponent}
        ]
    },
    {path: 'register', component: PageRegisterComponent, canActivate: [loginGuard]},
    {path: 'login', component: PageLoginComponent, canActivate: [loginGuard]},

];
