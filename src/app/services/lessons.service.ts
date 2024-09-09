import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { GetLessonsResponse } from '../models/get-lessons.response';
import { firstValueFrom } from 'rxjs';
import { Lesson } from '../models/lesson.model';
import { LoadLessonType } from '../types/load-lesson.type';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  readonly #http = inject(HttpClient);

  async loadLessons(config: LoadLessonType): Promise<Lesson[]> {
    const { query, courseId } = config;
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query);
    }

    if (courseId) {
      params = params.set('courseId', courseId);
    }

    const lessons$ = this.#http.get<GetLessonsResponse>(
      `${environment.apiRoot}/search-lessons`,
      {
        params
      }
    );
    const response = await firstValueFrom(lessons$);
    return response.lessons;
  }

  async saveLesson(
    lessonId: string,
    changes: Partial<Lesson>
  ): Promise<Lesson> {
    const lesson$ = this.#http.put<Lesson>(
      `${environment.apiRoot}/lessons/${lessonId}`,
      changes
    );
    return firstValueFrom(lesson$);
  }
}
