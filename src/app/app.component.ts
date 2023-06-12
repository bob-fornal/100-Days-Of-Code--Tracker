
import { Component } from '@angular/core';

import { ImageRoutingService } from '@core/services/image-routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public imageRoute: ImageRoutingService) {}

  getDeleteImage = (): string => {
    return this.imageRoute.getAssetPath('delete.png');
  };

  onClick = (event: any): void => {
    console.log(event);
  };
}
