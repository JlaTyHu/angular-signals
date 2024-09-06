import { Component, computed, effect, inject, signal } from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CourseCardListComponent } from '../../components/course-card-list/course-card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { openEditCourseDialog } from '../../utilities/open-edit-course-dialog';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTabGroup, MatTab, CourseCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly #courseService = inject(CourseService);
  readonly #dialog = inject(MatDialog);
  readonly #messageService = inject(MessageService);

  readonly #courses = signal<Course[]>([]);

  readonly beginnersCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category === 'BEGINNER');
  });

  readonly advancedCourses = computed(() => {
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
      const response = await this.#courseService.loadAllCourses();
      this.#courses.set(response.sort(sortCoursesBySeqNo));
    } catch (error) {
      this.#messageService.showMessage('Failed to load courses', 'error');
      console.error(error);
    }
  }

  async onCourseDeleted(courseId: string) {
    try {
      await this.#courseService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter((course) => course.id !== courseId);
      this.#courses.set(newCourses);
    } catch (error) {
      this.#messageService.showMessage('Cannot find the course by provided id.', 'error');
      console.error(error);
    }
  }

  async onAddCourse() {
    try {
      const newCourse = await openEditCourseDialog(this.#dialog, {
        mode: 'create',
        title: 'Create New Course'
      });
      const newCourses: Course[] = [
        ...this.#courses(),
        newCourse
      ];
      this.#courses.set(newCourses);
    } catch (error) {
      this.#messageService.showMessage('Cannot create course.', 'error');
      console.error(error);
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
