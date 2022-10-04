
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Structure } from '@core/interfaces/strucuture';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storage: any = window.localStorage;
  key: string = 'data-100Days';

  generateBlank = (numberOfDays: number = 100): Structure => {
    const structure: Structure = {
      useGoals: true,
      useNotes: true,
      days: [],
      goals: []
    };
    for (let i = 0, len = numberOfDays; i < len; i++) {
      structure.days.push({ number: i + 1, note: '', done: false });
    }
    return structure;
  };

  _structure: Structure = this.generateBlank();
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
