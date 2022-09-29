
import { Component, Input } from '@angular/core';

import { Item } from '@core/interfaces/item';

@Component({
  selector: 'item-svg',
  templateUrl: './item-svg.component.svg',
  styleUrls: ['./item-svg.component.scss']
})
export class ItemSvgComponent {

  @Input('item') item: Item = { number: -1, done: false };

}
