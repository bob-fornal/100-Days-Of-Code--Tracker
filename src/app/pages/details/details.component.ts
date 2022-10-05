
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

  useNotes: boolean = true;
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
    this.useNotes = structure.useNotes;
    this.days = structure.days;
  };

  toggleUseNotes = (): void => {
    const useNotes: boolean = !this._structure!.useNotes;
    this._structure!.useNotes = useNotes;
    this.storage.structureChange(this._structure!);
  };

  toggleEdit = (): void => {
    this.editVisible = !this.editVisible;
  };

  saveNote = (index: number, note: string): void => {
    if (this.useNotes === true && note.length === 0) return;

    this._structure!.days[index].note = note;
    this._structure!.days[index].done = true;
    this.storage.structureChange(this._structure!);
  };

}
