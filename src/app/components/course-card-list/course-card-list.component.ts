import { Component, inject, input, output } from '@angular/core';
import { Course } from '../../models/course.model';
import { UpperCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { openEditCourseDialog } from '../../utilities/open-edit-course-dialog';

@Component({
  selector: 'app-course-card-list',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './course-card-list.component.html',
  styleUrl: './course-card-list.component.scss'
})
export class CourseCardListComponent {
  courses = input.required<Course[]>();
  courseUpdated = output<Course>();
  courseIdDeleted = output<string>();

  #dialog = inject(MatDialog);

  async onEditCourse(course: Course) {
    const newCourse = await openEditCourseDialog(this.#dialog, {
      mode: 'update',
      title: 'Update Existing Course',
      course
    });

    this.courseUpdated.emit(newCourse);
  }

  onDeleteCourse(courseId: string) {
    this.courseIdDeleted.emit(courseId);
  }
}
