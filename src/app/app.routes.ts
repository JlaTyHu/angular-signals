import { Routes } from '@angular/router';
import { isUserAuthGuard } from './guards/auth.guard';
import { courseResolver } from './resolvers/course.resolver';
import { courseLessonsResolver } from './resolvers/course-lessons.resolver';

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
      import('./pages/course/course.component').then((m) => m.CourseComponent),
    canActivate: [isUserAuthGuard],
    resolve: {
      course: courseResolver,
      lessons: courseLessonsResolver
    }
  },
  {
    path: 'lessons',
    loadComponent: () =>
      import('./pages/lessons/lessons.component').then((m) => m.LessonsComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
