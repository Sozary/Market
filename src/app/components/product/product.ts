import {
  Component,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
  inputs: ["product"]
})
export class ProductComponent implements OnDestroy {
  ngOnDestroy(): void {
    // destroy my observables
  }
}
