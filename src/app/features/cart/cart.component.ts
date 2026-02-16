import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSnackBarModule, RouterModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  constructor(
    public cartService: CartService,
    private router: Router,
    private snack: MatSnackBar,
  ) {}

  pay() {
    if (this.cartService.getRemainingBalance() < 0) {
      this.snack.open('Insufficient funds', 'Close', { duration: 2000 });
      return;
    }

    this.snack.open('Payment Successful!', 'Close', { duration: 2000 });
    this.cartService.clearCart();
    this.router.navigate(['/products']);
  }

  onQuantityChange(productId: number, event: any) {
    const val = parseInt(event.target.value, 10);
    this.cartService.updateQuantity(productId, isNaN(val) ? 0 : val);
  }

  onlyNumbers(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
