import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/services/models/product.model';
import { ProductService } from '../../core/services/product.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  products = signal<Product[]>([]);
  loading = signal(true);

  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  public cartService = inject(CartService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    this.snackBar.open(`${product.title} added to cart!`, 'Close', {
      duration: 2000,
    });
  }
}
