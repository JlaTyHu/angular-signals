import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly #fb = inject(FormBuilder);
  readonly #messageService = inject(MessageService);
  readonly #loginService = inject(AuthService);
  readonly #router = inject(Router);

  readonly form = this.#fb.group({
    email: [''],
    password: ['']
  });

  async onLogin() {
    try {
      const { email, password } = this.form.value;

      if (!email || !password) {
        this.#messageService.showMessage(
          'Enter an email and password.',
          'error'
        );
        return;
      }

      await this.#loginService.login(email, password);
      await this.#router.navigate(['/home']);
    } catch (error) {
      this.#messageService.showMessage(
        'Failed to login, please try again.',
        'error'
      );
      console.error(error);
    }
  }
}
