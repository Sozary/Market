import {
  Component,
  OnDestroy
} from '@angular/core';
import $ from "jquery"

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

  ngAfterViewInit() {
    $(".info input").on("click", (e) => {
      e.stopPropagation()
    })

  }
}
