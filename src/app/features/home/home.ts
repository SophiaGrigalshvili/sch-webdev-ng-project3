import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product-service';
import { Card } from '../../layout/card/card';

@Component({
  imports: [ RouterLink, Card],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  productService = inject(ProductService);

  ngOnInit() {
    this.productService.getAllProducts();
  }
}
