import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditCourseDialogData } from '../models/edit-course-dialog.data.model';
import { EditCourseDialogComponent } from '../dialogs/edit-course-dialog/edit-course-dialog.component';
import { firstValueFrom } from 'rxjs';

export async function openEditCourseDialog(
  dialog: MatDialog,
  data: EditCourseDialogData
) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = 'clamp(300px, 100%, 400px)';
  config.data = data;

  const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();
  return firstValueFrom(close$);
}
