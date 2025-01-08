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
import {UsersTableComponent} from "./pages/admin/users-table/users-table.component";
import {AttendanceComponent} from "./pages/students/attendance/attendance.component";
import {ConductComponent} from './pages/students/conduct/conduct.component';
import {GradesComponent} from './pages/students/grades/grades.component';
import {ViewtimelineComponent} from "./pages/viewtimeline/viewtimeline.component";
import {RepreInscriptionComponent} from "./pages/representative/repre-inscription/repre-inscription.component";
import { DistributiveComponent } from './pages/admin/distributive/distributive.component';
import { RatingSystemComponent } from './pages/admin/rating-system/rating-system.component';
import { AcademicCalendarComponent } from './pages/admin/academic-calendar/academic-calendar.component';

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
            {path: 'course/assignment/:id', component: AssignmentViewComponent},
            {path: 'admin/all-user', component: UsersTableComponent},
            {path: 'admin/distributive', component: DistributiveComponent},
            {path: 'admin/ratingSystem', component: RatingSystemComponent},
            {path: 'admin/academic/calendar', component: AcademicCalendarComponent},
            {path: 'students/attendance', component: AttendanceComponent},
            {path: 'students/conduct', component: ConductComponent},
            {path: 'students/grades', component: GradesComponent},
            {path: 'example', component: ViewtimelineComponent},
            {path: 'representative/inscription', component: RepreInscriptionComponent},
        ]
    },
    {path: 'register', component: PageRegisterComponent, canActivate: [loginGuard]},
    {path: 'login', component: PageLoginComponent, canActivate: [loginGuard]},

];
