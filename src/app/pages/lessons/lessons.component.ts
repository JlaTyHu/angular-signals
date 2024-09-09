import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';
import { LessonDetailComponent } from '../../components/lesson-detail/lesson-detail.component';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [LessonDetailComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent {
  readonly mode = signal<'master' | 'detail'>('master');
  readonly lessons = signal<Lesson[]>([]);
  readonly selectedLesson = signal<Lesson | null>(null);

  readonly searchInput = viewChild.required<ElementRef>('search');

  readonly #lessonsService = inject(LessonsService);

  async onSearch() {
    const query = this.searchInput()?.nativeElement.value;
    const result = await this.#lessonsService.loadLessons({ query });
    this.lessons.set(result);
  }

  onLessonSelected(lesson: Lesson) {
    this.selectedLesson.set(lesson);
    this.mode.set('detail');
  }

  onCancel() {
    this.mode.set('master');
  }

  onLessonUpdated(updatedLesson: Lesson) {
    this.lessons.update((lessons) =>
      lessons.map((lesson) =>
        lesson.id === updatedLesson.id ? updatedLesson : lesson
      )
    );
  }
}
