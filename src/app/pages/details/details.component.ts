
import { Component } from '@angular/core';

import { StorageService } from '@core/services/storage.service';

import { Item } from '@core/interfaces/item';
import { Structure } from '@core/interfaces/strucuture';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  host: {'class': 'wrapper--content'}
})
export class DetailsComponent {

  editVisible: boolean = false;

  days: Array<Item> = [];
  _structure: Structure | null = null;

  constructor(
    public storage: StorageService
  ) {
    this.storage.structure.subscribe(this.handleStructureChange);
  }

  handleStructureChange = (structure: Structure): void => {
    this._structure = { ...structure };
    this.days = structure.days;
  };

  toggleEdit = (): void => {
    this.editVisible = !this.editVisible;
  };

  saveNote = (index: number): void => {
    const id: string = `note-${ index }`;
    const value = (<HTMLInputElement>document.getElementById(id)).value;
    if (value.length === 0) return;

    this._structure!.days[index].note = value;
    this._structure!.days[index].done = true;
    this.storage.structureChange(this._structure!);
  };

}
