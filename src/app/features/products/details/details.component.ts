import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  public productId = input<number>(0, {alias: 'id'});
  private readonly productsService = inject(ProductsService)
  private readonly sanitizer = inject(DomSanitizer);
  public product!:Signal<Product | undefined>;
  public starsArray:number[] = new Array(5).fill(0);
  cartStore = inject(CartStore);
  
  ngOnInit(): void {
    this.product = this.productsService.getProductById(this.productId())
  }

  addToCart() {
    this.cartStore.addToCart(this.product() as Product);
  }

  getStarType(index: number): string {
    const rate = this.product()?.rating.rate as number;
    if (index + 1 <= Math.floor(rate)) {
      return 'bi bi-star-fill';
    } else if (index  < rate) {
      return 'bi bi-star-half';
    } else {
      return 'bi bi-star'
    }
  }
}
