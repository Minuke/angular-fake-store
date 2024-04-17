import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';

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
  public product!:Signal<Product | undefined>;

  ngOnInit(): void {
    this.product = this.productsService.getProductById(this.productId())
  }

  addToCart():void {
    
  }
}
