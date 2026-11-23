import { Component, computed, inject } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { Card } from '../../layout/card/card';

@Component({
  imports: [Card],
  selector: 'app-shop',
  styleUrl: './shop.scss',
  templateUrl: './shop.html',
})
export class Shop {
  productService = inject(ProductService);

  currentPage: number = 1;
  pageLimit: number = 10;

  pages = computed(() => {
    let totalPages = Math.ceil(this.productService.totalProducts / this.pageLimit);
    let result = [];
    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }
    return result;
  });

  changePage(page: number) {
    this.currentPage = page;
    this.productService.getAllProducts(this.pageLimit, this.currentPage);

    this.pages = computed(() => {
      let totalPages = Math.ceil(this.productService.totalProducts / this.pageLimit);
      let result = [];
      for (let i = 1; i <= totalPages; i++) {
        result.push(i);
      }
      return result;
    });
  }

  ngOnInit() {
    this.productService.getAllProducts(this.pageLimit, this.currentPage);
    this.productService.getTotalNumOfProducts();
  }
}
