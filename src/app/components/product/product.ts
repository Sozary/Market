import {
  Component,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
  inputs: ["product", "type"]
})
export class ProductComponent implements OnDestroy {
  ngOnDestroy(): void {
    // destroy my observables
  }
}
