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
import { ScheduleAdminComponent } from './pages/admin/schedule-admin/schedule-admin.component';
import { MatriculateComponent } from './pages/opAdmin/matriculate/matriculate.component';
import { CoursesAdComponent } from './pages/opAdmin/courses-ad/courses-ad.component';
import { EstudentsTableComponent } from './pages/opAdmin/estudents-table/estudents-table.component';
import { InscriptionComponent } from './forms/representative/inscription/inscription.component';
import { InscriptionTableComponent } from './pages/opAdmin/inscription-table/inscription-table.component';
import { InscriptionsEstudentComponent } from './pages/representative/inscriptions-estudent/inscriptions-estudent.component';
import { MatriculateStudensComponent } from './pages/representative/matriculate-studens/matriculate-studens.component';
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { DashboardOpAdminComponent } from './pages/opAdmin/dashboard-op-admin/dashboard-op-admin.component';
import { DashboardTeacherComponent } from './pages/teacher/dashboard-teacher/dashboard-teacher.component';
import { DashboardStudentComponent } from './pages/students/dashboard-student/dashboard-student.component';
import { DashboardRepresentativeComponent } from './pages/representative/dashboard-representative/dashboard-representative.component';

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
            {path: 'admin/dashboard', component: DashboardAdminComponent},
            {path: 'course/schedule', component: ScheduleComponent},
            {path: 'course/:id', component: HomeCourseComponent},
            {path: 'course/assignment/:id', component: AssignmentViewComponent},
            {path: 'admin/all-user', component: UsersTableComponent},
            {path: 'admin/distributive', component: DistributiveComponent},
            {path: 'admin/ratingSystem', component: RatingSystemComponent},
            {path: 'admin/academic/calendar', component: AcademicCalendarComponent},
            {path: 'admin/schedule', component: ScheduleAdminComponent},
            {path: 'institutional/dashboard', component: DashboardOpAdminComponent},
            {path: 'institutional/matriculate', component: MatriculateComponent},
            {path: 'institutional/courses', component: CoursesAdComponent},
            {path: 'institutional/inscriptions', component: InscriptionTableComponent},
            {path: 'institutional/students', component: EstudentsTableComponent},
            {path: 'teacher/dashboard', component: DashboardTeacherComponent},
            {path: 'student/dashboard', component: DashboardStudentComponent},
            {path: 'students/attendance', component: AttendanceComponent},
            {path: 'students/conduct', component: ConductComponent},
            {path: 'students/grades', component: GradesComponent},
            {path: 'example', component: ViewtimelineComponent},
            {path: 'representative/dashboard', component: DashboardRepresentativeComponent},
            {path: 'representative/inscription/form', component: RepreInscriptionComponent},
            {path: 'representative/inscriptions', component: InscriptionsEstudentComponent},
            {path: 'representative/matriculates', component: MatriculateStudensComponent},
        ]
    },
    {path: 'register', component: PageRegisterComponent, canActivate: [loginGuard]},
    {path: 'login', component: PageLoginComponent, canActivate: [loginGuard]},

];
