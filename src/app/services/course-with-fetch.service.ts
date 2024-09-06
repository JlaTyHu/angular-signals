import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CourseWithFetchService {
  async loadAllCoursesFetch(): Promise<Course[]> {
    const response = await fetch(`${environment.apiRoot}/courses`);
    const payload = await response.json();
    return payload.courses;
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const response = await fetch(`${environment.apiRoot}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    });
    return response.json();
  }

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    const response = await fetch(`${environment.apiRoot}/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changes)
    });
    return response.json();
  }

  async deleteCourse(courseId: string): Promise<void> {
    await fetch(`${environment.apiRoot}/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
