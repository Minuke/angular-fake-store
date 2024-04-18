import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SlicePipe, RouterLink, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  public product = input.required<Product>();
  public addToCartEvent = output<Product>();

  addToCart(): void {
    this.addToCartEvent.emit(this.product());
  }

}
