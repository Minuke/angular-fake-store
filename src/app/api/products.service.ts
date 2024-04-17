import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    public products = signal<any[]>([]);
    private readonly http = inject(HttpClient);
    private readonly endPoint = environment.apiURL; 

  constructor(){
    this.getProducts();
  }

    public getProducts(): void {
      this.http
      .get<any[]>(`${this.endPoint}`)
      .pipe(tap((data:any[]) => this.products.set(data)))
      .subscribe();
    }

    public getProductById(id: number): any {
      return this.http.get<any>(`${this.endPoint}/${id}`);
    }
}
