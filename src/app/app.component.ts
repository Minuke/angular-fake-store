import { Component, Signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './api/products.service';
import { Product } from './shared/models/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private readonly productsService = inject(ProductsService);
  public products:Signal<Product[]> = this.productsService.products;
}
