import { Component, inject, signal } from '@angular/core';
import { EditCourseDialogData } from '../../models/edit-course-dialog.data.model';
import {
  MAT_DIALOG_DATA, MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import {
  CourseCategoryComboBoxComponent
} from '../../components/course-category-combo-box/course-category-combo-box.component';
import { CourseCategory } from '../../models/course-category.model';

@Component({
  selector: 'app-edit-course-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingComponent,
    MatDialogContent,
    CourseCategoryComboBoxComponent,
    MatDialogClose
  ],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {
  readonly #dialogRef = inject(MatDialogRef);
  readonly data: EditCourseDialogData = inject(MAT_DIALOG_DATA);
  readonly #fb = inject(FormBuilder);
  readonly #courseService = inject(CourseService);

  readonly form = this.#fb.group({
    title: [''],
    longDescription: [''],
    iconUrl: ['']
  });

  readonly category = signal<CourseCategory>('BEGINNER');

  constructor() {
    this.form.patchValue({
      title: this.data.course?.title,
      longDescription: this.data.course?.longDescription,
      iconUrl: this.data.course?.iconUrl
    });
    this.category.set(this.data.course?.category ?? 'BEGINNER');
  }

  async onSave() {
    const newCourse = this.form.value as Partial<Course>;
    newCourse.category = this.category();

    if (this.data.mode === 'update') {
      await this.saveCourse(this.data.course!.id, newCourse);
    } else if (this.data.mode === 'create') {
      await this.createCourse(newCourse);
    } else {
      console.error('The dialog mode type is not existing.');
      alert('The dialog mode type is not existing.');
    }
  }

  async saveCourse(courseId: string, changes: Partial<Course>) {
    try {
      const updatedCourse = await this.#courseService.saveCourse(
        courseId,
        changes
      );
      this.#dialogRef.close(updatedCourse);
    } catch (error) {
      console.error(error);
      alert('Failed to updated the course');
    }
  }

  async createCourse(course: Partial<Course>) {
    try {
      const newCourse = await this.#courseService.createCourse(course);
      this.#dialogRef.close(newCourse);
    } catch (error) {
      console.error(error);
      alert('Failed to create the course');
    }
  }
}
