import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Course } from '../models/course.model';
import { inject } from '@angular/core';
import { CourseService } from '../services/course.service';

export const courseResolver: ResolveFn<Course | null> = async (
  route: ActivatedRouteSnapshot
) => {
  const courseId = route.paramMap.get('courseId');

  if (!courseId) {
    return null;
  }

  const courseService = inject(CourseService);

  return courseService.getCourseById(courseId);
};
