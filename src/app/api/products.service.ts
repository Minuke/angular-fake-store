import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    public products = signal<Product[]>([]);
    private readonly http = inject(HttpClient);
    private readonly endPoint = environment.apiURL; 

  constructor(){
    this.getProducts();
  }

    public getProducts(): void {
      this.http
      .get<Product[]>(`${this.endPoint}/products/`)
      .pipe(tap((data:Product[]) => this.products.set(data)))
      .subscribe();
    }

    public getProductById(id: number): Observable<Product> {
      return this.http.get<Product>(`${this.endPoint}/${id}`);
    }
}
