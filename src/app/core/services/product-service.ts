import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { IProduct, IProductData } from '../models/iproduct';

@Service()
export class ProductService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://restaurantapi.stepacademy.ge';

  isLoading = signal<boolean>(false);
  errorMsg = signal<string | null>(null);

  productsData = signal<IProduct[]>([]);
  totalProducts = signal<number>(0);
  popularProducts = signal<IProduct[]>([]);
  productById = signal<IProduct | null>(null);

  getAllProducts(Take = 10, Page = 1) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http
      .get<IProductData>(`${this.BASE_URL}/api/products?Take=${Take}&Page=${Page}`)
      .subscribe({
        next: (data) => {
          console.log(data);

          this.isLoading.set(false);
        },
        error: (err) => {
          console.log('error in getting products:', err);

          this.errorMsg.set('There was a problem getting products!');
          this.isLoading.set(false);
        },
      });
  }
}
