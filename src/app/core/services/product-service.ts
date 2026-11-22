import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { IMetaData, IProduct, IProductData } from '../models/iproduct';

@Service()
export class ProductService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://restaurantapi.stepacademy.ge';

  isLoading = signal<boolean>(false);
  errorMsg = signal<string | null>(null);

  hasMore = signal<boolean>(false);
  productsData = signal<IProduct[]>([]);
  filteredProducts = signal<IProduct[]>([]);
  popularProducts = signal<IProduct[]>([]);
  productById = signal<IProduct | null>(null);
  totalProducts = signal<number>(0);

  getAllProducts(Take = 50, Page = 1) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http.get<IMetaData>(`${this.BASE_URL}/api/products?Take=${Take}&Page=${Page}`).subscribe({
      next: (data) => {
        this.hasMore.set(data.data.hasMore);

        this.productsData.set(data.data.products);
        this.totalProducts.set(data.data.products.length);

        this.popularProducts.set(data.data.products.sort((a, b) => b.rate - a.rate).slice(0, 6));

        console.log('all dishes:', this.productsData());
        console.log('popular dishes:', this.popularProducts());
        console.log('has more pages:', this.hasMore());

        this.isLoading.set(false);
      },
      error: (err) => {
        console.log('error in getting products:', err);

        this.errorMsg.set('There was a problem getting products!');
        this.isLoading.set(false);
      },
    });
  }

  getProductById(id: number) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http.get<IProduct>(`${this.BASE_URL}/api/products/${id}`).subscribe({
      next: (data) => {
        this.productById.set(data);

        console.log(this.productById());

        this.isLoading.set(false);
      },
      error: (err) => {
        console.log('error in getting product:', err);

        this.errorMsg.set('There was a problem getting the product!');
        this.isLoading.set(false);
      },
    });
  }
}
