
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Structure } from '@core/interfaces/strucuture';

import blank from '@core/constants/empty-structure.json';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  _structure: Structure = blank;
  structure: BehaviorSubject<Structure> = new BehaviorSubject<Structure>(this._structure);

  constructor() { }

  structureChange = (newStructure: Structure): void => {
    this._structure = { ...newStructure };
    this.structure.next(this._structure);
  };
}
