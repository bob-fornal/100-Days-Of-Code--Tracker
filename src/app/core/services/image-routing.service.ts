import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageRoutingService {

  location: any = window.location;

  getAssetPath = (image: string): string => {
    const basepath = `${ this.location.pathname }assets/images/`;
    console.log(this.location.pathname, basepath);
    const result: string = `${basepath}${image}`;
    console.log(result);
    return result;
  };
}
