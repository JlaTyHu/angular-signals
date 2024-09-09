import {
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { Lesson } from '../models/lesson.model';
import { inject } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { LoadLessonType } from '../types/load-lesson.type';

export const courseLessonsResolver: ResolveFn<Lesson[]> = async (
  route: ActivatedRouteSnapshot
) => {
  const { courseId, query } = route.params;

  if (!courseId) {
    return [];
  }

  const lessonsService = inject(LessonsService);

  const config: LoadLessonType = {
    courseId,
    query
  };

  return lessonsService.loadLessons(config);
};
