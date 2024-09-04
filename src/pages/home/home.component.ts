import { Component, computed, effect, inject, signal } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CourseCardListComponent } from '../../components/course-card-list/course-card-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabGroup, MatTab, CourseCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  courseService = inject(CourseService);

  #courses = signal<Course[]>([]);

  beginnersCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category === 'BEGINNER');
  });

  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category === 'ADVANCED');
  });

  constructor() {
    effect(() => {
      console.log('Beginners courses: ', this.beginnersCourses());
    });

    effect(() => {
      console.log('Advanced courses: ', this.advancedCourses());
    });

    this.loadCourses();
  }

  async loadCourses() {
    try {
      const response = await this.courseService.loadAllCourses();
      this.#courses.set(response.sort(sortCoursesBySeqNo));
    } catch (error) {
      alert('Failed to load courses');
      console.log(error);
    }
  }

  onCourseUpdated(updatedCourse: Course) {
    const courses = this.#courses();
    const newCourses = courses.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    );
    this.#courses.set(newCourses);
  }
}
