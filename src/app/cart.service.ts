import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './products';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  items: Product[] = [];

  addToCart(product: Product) {
    this.items.push(product);
  }

  removeFromCart(product: Product) {
    if (this.items.length > 1) {
      this.items = this.items.splice(this.items.indexOf(product), 1);
    } else {
      this.items.pop();
    }
    return this.items;
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
  }
}
