import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  hide = true;
  loading = false;

  private fb = inject(FormBuilder);

  // Strongly typed, non-nullable form
  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar,
  ) {}

  submit() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    // Properly typed credentials
    const credentials = this.loginForm.getRawValue();

    this.auth.login(credentials).subscribe({
      next: () => {
        this.snack.open('Login successful', 'Close', { duration: 2000 });
        this.router.navigate(['/products']);
      },
      error: () => {
        this.snack.open('Invalid credentials', 'Close', { duration: 2000 });
        this.loading = false;
      },
    });
  }
}
