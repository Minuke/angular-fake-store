import { Component, input } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  public productId = input<number>(0, {alias: 'id'});
  
}
