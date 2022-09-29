
import { Component } from '@angular/core';

import { StorageService } from '@core/services/storage.service';

import { Item } from '@core/interfaces/item';
import { Structure } from '@core/interfaces/strucuture';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {'class': 'wrapper--content'}
})
export class DashboardComponent {

  days: Array<Item> = [];
  _structure: Structure | null = null;

  constructor(
    private storage: StorageService
  ) {
    this.storage.structure.subscribe(this.handleStructureChange);
  }

  handleStructureChange = (structure: Structure): void => {
    this._structure = { ...structure };
    this.days = structure.days;
  };

  selectDay = (index: number): void => {
    this._structure!.days[index].done = true;
    this.storage.structureChange(this._structure!);
  };

}
