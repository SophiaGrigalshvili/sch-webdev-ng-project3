import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../core/services/product-service';
import { Component, inject } from '@angular/core';
import { Card } from '../../layout/card/card';

@Component({
  imports: [Card],
  selector: 'app-details',
  styleUrl: './details.scss',
  templateUrl: './details.html',
})
export class Details {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const NumId = Number(id);
      this.productService.getProductById(NumId);
    }
  }
}
