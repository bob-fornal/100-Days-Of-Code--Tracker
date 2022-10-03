
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Structure } from '@core/interfaces/strucuture';

import blank from '@core/constants/empty-structure.json';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: any = window.localStorage;
  key: string = 'data-100Days';

  _structure: Structure = blank;
  structure: BehaviorSubject<Structure> = new BehaviorSubject<Structure>(this._structure);

  constructor() {
    this.loadStructure();
  }

  structureChange = (newStructure: Structure): void => {
    this._structure = { ...newStructure };
    this.structure.next(this._structure);
    this.storeStructure(this._structure);
  };

  storeStructure = (structure: Structure): void => {
    this.storage.setItem(this.key, JSON.stringify(structure));
  };

  loadStructure = () => {
    const dataString: string | null = this.storage.getItem(this.key);
    if (dataString === null) return;

    const data: Structure = JSON.parse(dataString);
    this._structure = { ...data };
    this.structure.next(this._structure);
  };

}
