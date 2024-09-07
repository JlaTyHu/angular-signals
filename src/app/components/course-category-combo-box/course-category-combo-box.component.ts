import { Component, input, model } from '@angular/core';
import { CourseCategory } from '../../models/course-category.model';

@Component({
  selector: 'app-course-category-combo-box',
  standalone: true,
  imports: [],
  templateUrl: './course-category-combo-box.component.html',
  styleUrl: './course-category-combo-box.component.scss'
})
export class CourseCategoryComboBoxComponent {
  label = input.required<string>();
  value = model.required<CourseCategory>();

  onCategoryChanged(category: string) {
    this.value.set(category as CourseCategory);
  }
}
