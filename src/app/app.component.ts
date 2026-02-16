import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    @if (authService.isAuthenticated()) {
      <nav class="bg-white shadow-sm p-4 flex gap-6 justify-center items-center border-b">
        <a
          routerLink="/products"
          routerLinkActive="text-blue-600 font-bold"
          [routerLinkActiveOptions]="{ exact: true }"
          class="text-gray-600 hover:text-blue-500 transition-colors"
        >
          Products
        </a>
        <a
          routerLink="/cart"
          routerLinkActive="text-blue-600 font-bold"
          class="text-gray-600 hover:text-blue-500 transition-colors"
        >
          Cart
        </a>
        <button
          (click)="authService.logout()"
          class="text-red-600 hover:text-red-700 font-medium transition-colors ml-4"
        >
          Logout
        </button>
      </nav>
    }
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  public authService = inject(AuthService);
}
