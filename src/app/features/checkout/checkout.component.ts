import { Component, inject } from '@angular/core';
import { CartStore } from '@shared/store/shopping-cart.store';
import { CheckoutService } from './services/checkout.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  public cartStore = inject(CartStore);
  private readonly checkoutService = inject(CheckoutService);

  proceedToPay(): void {
    this.checkoutService.proceedToPay();
  }

  removeItem(id:number): void {
    this.cartStore.removeFromCart(id);
  }

  clearAll(): void {
    this.cartStore.clearCart();
  }
}
