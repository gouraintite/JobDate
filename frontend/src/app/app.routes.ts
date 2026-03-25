import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
  },
  // Student routes
  {
    path: 'student/profile',
    loadComponent: () => import('./features/student/profile/student-profile.component').then((m) => m.StudentProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'student/profile/edit',
    loadComponent: () => import('./features/student/profile-edit/student-profile-edit.component').then((m) => m.StudentProfileEditComponent),
    canActivate: [authGuard],
  },
  {
    path: 'student/qr',
    loadComponent: () => import('./features/student/qr-code/qr-code.component').then((m) => m.QrCodeComponent),
    canActivate: [authGuard],
  },
  // Public profile (QR code scan landing — no auth)
  {
    path: 'profile/:token',
    loadComponent: () => import('./features/student/public-profile/public-profile.component').then((m) => m.PublicProfileComponent),
  },
  // Company routes
  {
    path: 'company/dashboard',
    loadComponent: () => import('./features/company/dashboard/company-dashboard.component').then((m) => m.CompanyDashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'company/events/new',
    loadComponent: () => import('./features/company/event-form/event-form.component').then((m) => m.EventFormComponent),
    canActivate: [authGuard],
  },
  {
    path: 'company/events/:id/edit',
    loadComponent: () => import('./features/company/event-form/event-form.component').then((m) => m.EventFormComponent),
    canActivate: [authGuard],
  },
  // Events
  {
    path: 'events',
    loadComponent: () => import('./features/events/event-list/event-list.component').then((m) => m.EventListComponent),
  },
  {
    path: 'events/:id',
    loadComponent: () => import('./features/events/event-detail/event-detail.component').then((m) => m.EventDetailComponent),
  },
  // QR scanner (company at live event)
  {
    path: 'scan',
    loadComponent: () => import('./features/scan/scan.component').then((m) => m.ScanComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
