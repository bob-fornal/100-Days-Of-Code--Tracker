
import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-image',
  template: '<div>Menu</div>'
})
export class ItemImageComponent {
  @Input('item') item: string = '';
}
