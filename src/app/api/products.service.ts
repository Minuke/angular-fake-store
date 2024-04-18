import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable, Signal, inject, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { Product } from '@shared/models/product.interface';
import { Observable, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    public products = signal<Product[]>([]);
    private readonly http = inject(HttpClient);
    private readonly endPoint = environment.apiURL; 
    private readonly injector = inject(EnvironmentInjector);

    constructor(){
      this.getProducts();
    }

    public getProducts(): void {
      this.http
      .get<Product[]>(`${this.endPoint}/products/`)
      .pipe(
        map((products:Product[]) => products.map((product:Product) => ({...product, qty: 1}))),
        tap((products:Product[]) => this.products.set(products)))
      .subscribe();
    }

    public getProductById(id: number): Signal<Product | undefined> {
      const product$ = this.http.get<Product>(`${this.endPoint}/products/${id}`);
      return toSignal<Product>(product$, {injector: this.injector})
    }
}
