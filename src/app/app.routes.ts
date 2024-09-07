import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'course/:courseId',
    loadComponent: () =>
      import('./pages/course/course.component').then((m) => m.CourseComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
