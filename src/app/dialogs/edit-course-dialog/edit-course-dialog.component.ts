import { Component, inject } from '@angular/core';
import { EditCourseDialogData } from '../../models/edit-course-dialog.data.model';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-edit-course-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingComponent, MatDialogContent],
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
    category: [''],
    iconUrl: ['']
  });

  constructor() {
    this.form.patchValue({
      title: this.data.course?.title,
      longDescription: this.data.course?.longDescription,
      category: this.data.course?.category,
      iconUrl: this.data.course?.iconUrl
    });
  }

  async onSave() {
    const newCourse = this.form.value as Partial<Course>;

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

  onClose() {
    this.#dialogRef.close();
  }
}
