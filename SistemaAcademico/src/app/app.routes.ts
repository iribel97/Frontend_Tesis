import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./Formularios/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./Pages/DashBoard/dash-admin/dash-admin.component').then(m => m.DashAdminComponent),
    }
];
