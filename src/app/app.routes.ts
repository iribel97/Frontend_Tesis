import {Routes} from '@angular/router';
import {PageRegisterComponent} from "./pages/page-register/page-register.component";
import {PageLoginComponent} from "./pages/page-login/page-login.component";
import {PrincipalComponent} from "./templates/principal/principal.component";
import {HomeComponent} from "./pages/home/home.component";
import {UsersComponent} from "./pages/admin/users/users.component";
import {HomeCourseComponent} from "./pages/course/home-course/home-course.component";
import {loginGuard} from "./guard/login.guard";
import {authGuard} from "./guard/auth.guard";
import {ScheduleComponent} from "./pages/course/schedule/schedule.component";
import {AssignmentViewComponent} from "./pages/course/assignment-view/assignment-view.component";

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
            {path: 'course/schedule', component: ScheduleComponent},
            {path: 'course/:id', component: HomeCourseComponent},
            {path: 'course/assignment/:id', component: AssignmentViewComponent}
        ]
    },
    {path: 'register', component: PageRegisterComponent, canActivate: [loginGuard]},
    {path: 'login', component: PageLoginComponent, canActivate: [loginGuard]},

];
