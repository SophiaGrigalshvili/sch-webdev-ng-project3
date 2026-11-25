import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { IMetaData, IMetaDataId, IProduct, IProductData } from '../models/iproduct';

@Service()
export class ProductService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://restaurantapi.stepacademy.ge';

  isLoading = signal<boolean>(false);
  errorMsg = signal<string | null>(null);

  totalIsLoading = signal<boolean>(false);
  totalErrorMsg = signal<string | null>(null);

  hasMore = signal<boolean>(false);

  productsData = signal<IProduct[]>([]);
  numOfProducts = 0;

  filteredProducts = signal<IProduct[]>([]);
  popularProducts = signal<IProduct[]>([]);
  productById = signal<IProduct | null>(null);

  allProducts = signal<IProduct[]>([]);
  totalProducts = 0;

  getAllProducts(Take = 100, Page = 1) {
    this.isLoading.set(true);
    this.errorMsg.set(null);

    this.http.get<IMetaData>(`${this.BASE_URL}/api/products?Take=${Take}&Page=${Page}`).subscribe({
      next: (data) => {
        this.hasMore.set(data.data.hasMore);

        this.productsData.set(data.data.products);
        this.popularProducts.set(data.data.products.sort((a, b) => b.rate - a.rate).slice(0, 6));
        this.numOfProducts = this.productsData().length;

        console.log('all dishes:', this.productsData());
        console.log('popular dishes:', this.popularProducts());
        console.log('has more pages:', this.hasMore());
        console.log('displaying products:', this.numOfProducts);

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

    this.http.get<IMetaDataId>(`${this.BASE_URL}/api/products/${id}`).subscribe({
      next: (data) => {
        this.productById.set(data.data);

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
  getTotalNumOfProducts(Take = 100, Page = 1) {
    this.totalIsLoading.set(true);
    this.totalErrorMsg.set(null);

    this.http.get<IMetaData>(`${this.BASE_URL}/api/products?Take=${Take}&Page=${Page}`).subscribe({
      next: (data) => {
        this.totalIsLoading.set(false);

        this.allProducts.set(data.data.products);
        this.totalProducts = this.allProducts().length;

        console.log('total number of products:', this.totalProducts);

        this.totalIsLoading.set(false);
      },
      error: (err) => {
        console.log('error in getting All products:', err);

        this.totalErrorMsg.set('There was a problem getting All products!');
        this.totalIsLoading.set(false);
      },
    });
  }
}
