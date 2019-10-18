import {
  Component,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import $ from "jquery"

@Component({
  selector: 'product',
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
  inputs: ["product", "type"]
})
export class ProductComponent {

  @Output()
  private value_changed = new EventEmitter < string > ();

  @Input()
  private type

  private product

  changeProduct(product) {
    this.value_changed.emit(product.name)
  }

  ngAfterViewInit() {
    $(".info input").on("click", (e) => {
      e.stopPropagation()
    })

  }
}
