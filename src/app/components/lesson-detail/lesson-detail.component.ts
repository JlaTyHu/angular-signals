import { Component, inject, input, output } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {
  readonly lesson = input.required<Lesson | null>();
  readonly lessonUpdated = output<Lesson>();
  readonly cancel = output<void>();

  readonly #lessonsService = inject(LessonsService);
  readonly #messageService = inject(MessageService);

  onCancel() {
    this.cancel.emit();
  }

  async onSave(description: string) {
    try {
      const lesson = this.lesson();

      const response = await this.#lessonsService.saveLesson(lesson!.id, {
        description
      });

      this.lessonUpdated.emit(response);
    } catch (error) {
      console.error(error);
      this.#messageService.showMessage('Error saving the lesson!', 'error');
    }
  }
}
