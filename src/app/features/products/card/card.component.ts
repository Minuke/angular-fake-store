import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Product } from '@shared/models/product.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SlicePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  public product = input.required<Product>();

}
