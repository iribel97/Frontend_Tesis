import { Routes } from '@angular/router';
import { DashAdminComponent } from './mDashBoard/dash-admin/dash-admin.component';
import { FormularioComponent } from './login/formulario/formulario.component';

export const routes: Routes = [
    { path: 'login', component: FormularioComponent},
    { path: 'dashboard', component: DashAdminComponent}, 
    { path: '', redirectTo: 'login', pathMatch: 'full'}
];
