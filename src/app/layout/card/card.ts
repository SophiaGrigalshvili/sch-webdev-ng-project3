import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductService } from '../../core/services/product-service';
import { IProduct } from '../../core/models/iproduct';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink, ],
  selector: 'app-card',
  styleUrl: './card.scss',
  templateUrl: './card.html',
})
export class Card {
  @Input() dish!: IProduct;
  @Input() isDetails: boolean = false;

  @Output() dishId = new EventEmitter<number>();

  goToDetailsPage() {
    this.dishId.emit(this.dish.id);
  }
}
