import { inject, Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GetCoursesResponse } from '../models/get-courses.response';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  #http = inject(HttpClient);

  async loadAllCourses(): Promise<Course[]> {
    const courses$ = this.#http.get<GetCoursesResponse>(
      `${environment.apiRoot}/courses`
    );
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  async getCourseById(courseId: string): Promise<Course> {
    const course$ = this.#http.get<Course>(
      `${environment.apiRoot}/courses/${courseId}`
    );
    return firstValueFrom(course$);
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ = this.#http.post<Course>(
      `${environment.apiRoot}/courses`,
      course
    );
    return firstValueFrom(course$);
  }

  async saveCourse(
    courseId: string,
    changes: Partial<Course>
  ): Promise<Course> {
    const course$ = this.#http.put<Course>(
      `${environment.apiRoot}/courses/${courseId}`,
      changes
    );
    return firstValueFrom(course$);
  }

  async deleteCourse(courseId: string): Promise<void> {
    const course$ = this.#http.delete<void>(
      `${environment.apiRoot}/courses/${courseId}`
    );
    return firstValueFrom(course$);
  }
}
