import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product.model';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_KEY = 'cart_items';
  private walletBalance = 1000;

  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  cart$ = this.cartSubject.asObservable();

  private loadFromStorage(): CartItem[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.CART_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(cart: CartItem[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }

  addProduct(product: Product) {
    const cart = [...this.getCart()];
    const existingIndex = cart.findIndex((p) => p.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex] = {
        ...cart[existingIndex],
        quantity: cart[existingIndex].quantity + 1,
      };
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    this.cartSubject.next(cart);
    this.saveToStorage(cart);
  }

  decrease(productId: number) {
    let cart = [...this.getCart()];
    const index = cart.findIndex((p) => p.id === productId);

    if (index > -1) {
      if (cart[index].quantity > 1) {
        cart[index] = { ...cart[index], quantity: cart[index].quantity - 1 };
      } else {
        cart.splice(index, 1);
      }
    }

    this.cartSubject.next(cart);
    this.saveToStorage(cart);
  }

  updateQuantity(productId: number, quantity: number) {
    let cart = [...this.getCart()];
    const index = cart.findIndex((p) => p.id === productId);

    if (index > -1) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index] = { ...cart[index], quantity };
      }
      this.cartSubject.next(cart);
      this.saveToStorage(cart);
    }
  }

  getTotal(): number {
    return this.getCart().reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  getWalletBalance(): number {
    return this.walletBalance;
  }

  getRemainingBalance(): number {
    return this.walletBalance - this.getTotal();
  }

  clearCart() {
    this.cartSubject.next([]);
    this.saveToStorage([]);
  }
}
