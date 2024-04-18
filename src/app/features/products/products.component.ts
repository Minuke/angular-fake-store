import { Component, Signal, inject } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CardComponent } from './card/card.component';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  private readonly productsService = inject(ProductsService);
  public products:Signal<Product[]> = this.productsService.products;
  private readonly cartStore = inject(CartStore);

  addToCart(product:Product):void {
    this.cartStore.addToCart(product);
  }
}
